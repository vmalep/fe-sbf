import { IResourceComponentsProps, CrudFilters, HttpError } from "@pankod/refine-core";

import {
  List,
  Table,
  TextField,
  useTable,
  getDefaultSortOrder,
  Space,
  EditButton,
  DeleteButton,
  ShowButton,
  NumberField,
  Select,
  useSelect,
  FilterDropdown,
  BooleanField,
  Form,
  Button,
  Card,
  FormProps,
  Row,
  Col,
  Radio,
  InputNumber,
} from "@pankod/refine-antd";

import {
  IBook,
  IUser,
  ILibrary,
  ICourse,
  ISchoolYear,
  IBookFilterVariables,
} from "interfaces";

export const BookList: React.FC<IResourceComponentsProps> = () => {
  const { tableProps, sorter, searchFormProps } = useTable<IBook, HttpError, IBookFilterVariables>({
    initialSorter: [
      {
        field: "id",
        order: "desc",
      },
    ],
    onSearch: (params) => {
      const filters: CrudFilters = [];
      const { is_available, minprice, maxprice } = params;

      filters.push(
        {
          field: "is_available",
          operator: "eq",
          value: is_available,
        },
        {
          field: "price",
          operator: "gte",
          value: minprice ? minprice : undefined,
        },
        {
          field: "price",
          operator: "lte",
          value: maxprice ? maxprice : undefined,
        },
      );
      console.log('filters: ', filters);
      return filters;
    },
    metaData: {
      populate: [
        "users_permissions_user",
        "library",
        "library.course",
        "library.course.school_year",
      ],
    },
  });

  //console.log("tableProps: ", tableProps);

  const { selectProps: librarySelectProps } = useSelect<ILibrary>({
    resource: "libraries",
  });

  const { selectProps: SchoolYearSelectProps } = useSelect<ISchoolYear>({
    resource: "school-years",
  });

  const { selectProps: courseSelectProps } = useSelect<ICourse>({
    resource: "courses",
  });

  const { selectProps: userSelectProps } = useSelect<IUser>({
    resource: "users",
    optionLabel: "username",
    optionValue: "id",
  });

  return (
    <>
      <Card>
        <Filter formProps={searchFormProps} />
      </Card>
      <Card>
        <List>
          <Table {...tableProps} rowKey="id">
            <Table.Column
              dataIndex="id"
              key="id"
              title="ID"
              render={(value) => <TextField value={value} />}
              defaultSortOrder={getDefaultSortOrder("id", sorter)}
              sorter
            />
            <Table.Column
              key="[school_year][id]"
              dataIndex={["library", "data", "attributes", "course", "data", "attributes", "school_year", "data", "attributes", "title"]}
              title="School year"
              render={(value) => <TextField value={value} />}
              sorter
              filterDropdown={(props) => (
                <FilterDropdown {...props}>
                  <Select
                    allowClear
                    style={{ minWidth: 200 }}
                    mode="multiple"
                    placeholder="Select Courses"
                    {...SchoolYearSelectProps}
                  />
                </FilterDropdown>
              )}
            />
            <Table.Column
              key="[course][id]"
              dataIndex={["library", "data", "attributes", "course", "data", "attributes", "title"]}
              title="Course"
              render={(value) => <TextField value={value} />}
              sorter
              filterDropdown={(props) => (
                <FilterDropdown {...props}>
                  <Select
                    allowClear
                    style={{ minWidth: 200 }}
                    mode="multiple"
                    placeholder="Select Courses"
                    {...courseSelectProps}
                  />
                </FilterDropdown>
              )}
            />
            <Table.Column
              key="[library][id]"
              dataIndex={["library", "data", "attributes", "title"]}
              title="Title"
              sorter
              filterDropdown={(props) => (
                <FilterDropdown {...props}>
                  <Select
                    allowClear
                    style={{ minWidth: 200 }}
                    mode="multiple"
                    placeholder="Select Title"
                    {...librarySelectProps}
                  />
                </FilterDropdown>
              )}
            />
            <Table.Column
              key="is_available"
              dataIndex="is_available"
              title="Available"
              render={(value) => <BooleanField value={value} />}
            />
            <Table.Column
              key="[user][id]"
              dataIndex={["users_permissions_user", "data", "attributes", "username"]}
              title="Owner"
              sorter
              filterDropdown={(props) => (
                <FilterDropdown {...props}>
                  <Select
                    allowClear
                    style={{ minWidth: 200 }}
                    mode="multiple"
                    placeholder="Select Owner"
                    {...userSelectProps}
                  />
                </FilterDropdown>
              )}
            />
            <Table.Column
              key="state"
              dataIndex="state"
              title="State"
              sorter
            />
            <Table.Column
              dataIndex="price"
              key="price"
              title="Price (€)"
              align="right"
              //render={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, '.')}
              render={(value) => <NumberField value={value} />}
              defaultSortOrder={getDefaultSortOrder("title", sorter)}
              sorter
            />
            <Table.Column<IBook>
              title="Actions"
              dataIndex="actions"
              render={(_, record) => (
                <Space>
                  <ShowButton hideText size="small" recordItemId={record.id} />
                  <EditButton hideText size="small" recordItemId={record.id} />
                  <DeleteButton hideText size="small" recordItemId={record.id} />
                </Space>
              )}
            />
          </Table>
        </List>
      </Card>
    </>
  );
};

const Filter: React.FC<{ formProps: FormProps }> = ({ formProps }) => {

  return (
    <Form layout="horizontal" {...formProps}>
      {/*       <Row>
        <Col>
          <Form.Item label="Search" name="q">
            <Input
              placeholder="ID, Title, Price, etc."
              prefix={<Icons.SearchOutlined />}
            />
          </Form.Item>
        </Col>
      </Row> */}
      <Row>
        <Col flex="1 0 auto">
          <Form.Item label="Availability" name="is_available">
            <Radio.Group>
              <Radio value={true}>Only available</Radio>
              {/* <Radio value={false}>False</Radio> // Not working (?) */}
              <Radio value={undefined}>Both</Radio>
            </Radio.Group>
          </Form.Item>
        </Col>
        <Col flex="1 0 auto">
          <Row gutter={[8, 8]}>
            <Col>
              <Form.Item label="Min price" name="minprice">
                <InputNumber prefix="€" />
              </Form.Item>
            </Col>
            <Col>
              <Form.Item label="Max price" name="maxprice">
                <InputNumber prefix="€" />
              </Form.Item>
            </Col>
          </Row>
        </Col>
        <Col flex="1 0 auto">
          <Form.Item>
            <Button htmlType="submit" type="primary">
              Filter
            </Button>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};
