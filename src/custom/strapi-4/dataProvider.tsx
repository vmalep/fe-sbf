import axios, { AxiosInstance } from "axios";
import {
    DataProvider as IDataProvider,
    HttpError,
    CrudFilters,
    CrudSorting,
    CrudOperators,
    BaseKey,
} from "@pankod/refine-core";
import { stringify, parse } from "qs";

const TOKEN_KEY = process.env.REACT_APP_API_TOKEN_KEY!;

const axiosInstance = axios.create();

axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        const customError: HttpError = {
            ...error,
            message: error.response?.data?.message,
            statusCode: error.response?.status,
        };

        return Promise.reject(customError);
    },
);

const mapOperator = (operator: CrudOperators) => {
    switch (operator) {
        case "nin":
            return "notIn";
        case "ncontains":
            return "notContains";
        case "containss":
            return "containsi";
        case "ncontainss":
            return "notContainsi";
    }

    return operator;
};

const generateSort = (sort?: CrudSorting) => {
    const _sort: string[] = [];

    if (sort) {
        sort.map((item) => {
            if (item.order) {
                _sort.push(`${item.field}:${item.order}`);
            }
        });
    }

    return _sort;
};

const generateFilter = (filters?: CrudFilters) => {
    let rawQuery = "";

    if (filters) {
        filters.map((filter) => {
            if (filter.operator !== "or") {
                const { field, operator, value } = filter;

                const mapedOperator = mapOperator(operator);

                if (Array.isArray(value)) {
                    value.map((val, index) => {
                        rawQuery += `&filters[${field}][$${mapedOperator}][${index}]=${val}`;
                    });
                } else {
                    rawQuery += `&filters[${field}][$${mapedOperator}]=${value}`;
                }
            } else {
                const { value } = filter;

                value.map((item, index) => {
                    const { field, operator, value } = item;

                    const mapedOperator = mapOperator(operator);

                    rawQuery += `&filters[$or][${index}][${field}][$${mapedOperator}]=${value}`;
                });
            }
        });
    }

    const parsedQuery = parse(rawQuery);
    const queryFilters = stringify(parsedQuery, { encodeValuesOnly: true });

    return queryFilters;
};

const normalizeData = (data: any): any => {
    const isObject = (data: any) =>
        Object.prototype.toString.call(data) === "[object Object]";

    const flatten = (data: any) => {
        if (!data.attributes) return data;

        return {
            id: data.id,
            ...data.attributes,
        };
    };

    if (Array.isArray(data)) {
        return data.map((item) => normalizeData(item));
    }

    if (isObject(data)) {
        if (Array.isArray(data.data)) {
            data = [...data.data];
        } else if (isObject(data.data)) {
            data = flatten({ ...data.data });
        } else if (data.data === null) {
            data = null;
        } else {
            data = flatten(data);
        }

        for (const key in data) {
            data[key] = normalizeData(data[key]);
        }

        return data;
    }

    return data;
};

export const DataProvider = (
    apiUrl: string,
    httpClient: AxiosInstance = axiosInstance,
): IDataProvider => ({
    getList: async ({ resource, pagination, filters, sort, metaData }) => {
        const token = localStorage.getItem(TOKEN_KEY);
        const url = `${apiUrl}/${resource}`;

        const current = pagination?.current || 1;
        const pageSize = pagination?.pageSize || 10;
        const locale = metaData?.locale;
        const fields = metaData?.fields;
        const populate = metaData?.populate;
        const publicationState = metaData?.publicationState;

        const quertSorters = generateSort(sort);
        const queryFilters = generateFilter(filters);

        const query = {
            "pagination[page]": current,
            "pagination[pageSize]": pageSize,
            locale,
            publicationState,
            fields,
            populate,
            sort: quertSorters.length > 0 ? quertSorters.join(",") : undefined,
        };

        if (token) {
            httpClient.defaults.headers = {
              Authorization: `Bearer ${token}`,
            };
        }

        console.log('url: ', url);
        const { data } = await httpClient.get(
            `${url}?${stringify(query, {
                encodeValuesOnly: true,
            })}&${queryFilters}`,
        );

        return {
            data: normalizeData(data),
            total: data.meta.pagination.total,
        };
    },

    getMany: async ({ resource, ids }) => {
        const url = `${apiUrl}/${resource}`;

        const query = ids
            .map((item: BaseKey) => `filters[id][$in]=${item}`)
            .join("&");

        const { data } = await httpClient.get(`${url}?${query}`);

        return {
            data: normalizeData(data),
        };
    },

    create: async ({ resource, variables }) => {
        const url = `${apiUrl}/${resource}`;

        let dataVariables: any = { data: variables };

        if (resource === "users") {
            dataVariables = variables;
        }

        const { data } = await httpClient.post(url, dataVariables);
        return {
            data,
        };
    },

    update: async ({ resource, id, variables }) => {
        const url = `${apiUrl}/${resource}/${id}`;

        let dataVariables: any = { data: variables };

        if (resource === "users") {
            dataVariables = variables;
        }

        const { data } = await httpClient.put(url, dataVariables);
        return {
            data,
        };
    },

    updateMany: async ({ resource, ids, variables }) => {
        const response = await Promise.all(
            ids.map(async (id) => {
                const url = `${apiUrl}/${resource}/${id}`;

                let dataVariables: any = { data: variables };

                if (resource === "users") {
                    dataVariables = variables;
                }
                const { data } = await httpClient.put(url, dataVariables);
                return data;
            }),
        );

        return { data: response };
    },

    createMany: async ({ resource, variables }) => {
        const response = await Promise.all(
            variables.map(async (param) => {
                const { data } = await httpClient.post(
                    `${apiUrl}/${resource}`,
                    {
                        data: param,
                    },
                );
                return data;
            }),
        );

        return { data: response };
    },

    getOne: async ({ resource, id, metaData }) => {
        const locale = metaData?.locale;
        const fields = metaData?.fields;
        const populate = metaData?.populate;

        const query = {
            locale,
            fields,
            populate,
        };

        const url = `${apiUrl}/${resource}/${id}?${stringify(query, {
            encode: false,
        })}`;

        const { data } = await httpClient.get(url);

        return {
            data: normalizeData(data),
        };
    },

    deleteOne: async ({ resource, id }) => {
        const url = `${apiUrl}/${resource}/${id}`;

        const { data } = await httpClient.delete(url);

        return {
            data,
        };
    },

    deleteMany: async ({ resource, ids }) => {
        const response = await Promise.all(
            ids.map(async (id) => {
                const { data } = await httpClient.delete(
                    `${apiUrl}/${resource}/${id}`,
                );
                return data;
            }),
        );
        return { data: response };
    },

    getApiUrl: () => {
        return apiUrl;
    },

    custom: async ({ url, method, filters, sort, payload, query, headers }) => {
        let requestUrl = `${url}?`;

        if (sort) {
            const sortQuery = generateSort(sort);
            if (sortQuery.length > 0) {
                requestUrl = `${requestUrl}&${stringify({
                    sort: sortQuery.join(","),
                })}`;
            }
        }

        if (filters) {
            const filterQuery = generateFilter(filters);
            requestUrl = `${requestUrl}&${filterQuery}`;
        }

        if (query) {
            requestUrl = `${requestUrl}&${stringify(query)}`;
        }

        if (headers) {
            httpClient.defaults.headers = {
                ...httpClient.defaults.headers,
                ...headers,
            };
        }

        let axiosResponse;
        switch (method) {
            case "put":
            case "post":
            case "patch":
                axiosResponse = await httpClient[method](url, payload);
                break;
            case "delete":
                axiosResponse = await httpClient.delete(url);
                break;
            default:
                axiosResponse = await httpClient.get(requestUrl);
                break;
        }

        const { data } = axiosResponse;

        return Promise.resolve({ data });
    },
});
