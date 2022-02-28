import {
  IResourceComponentsProps,
  CrudFilters,
  HttpError,
  useGetIdentity,
 } from "@pankod/refine-core";

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
  Checkbox,
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
  const { data: user } = useGetIdentity();
  const { tableProps, sorter, searchFormProps } = useTable<IBook, HttpError, IBookFilterVariables>({
    initialSorter: [
      {
        field: "id",
        order: "desc",
      },
    ],
    metaData: {
      populate: [
        "users_permissions_user",
        "library",
        "library.course",
        "library.course.school_year",
      ],
    },
    initialFilter: [
      {
        field: "users_permissions_user.id",
        operator: "eq",
        value: user?.id,
      }
    ],
    onSearch: (params) => {
      const filters: CrudFilters = [];
      const { my_books_only, is_available, minprice, maxprice } = params;

      console.log('params:', params);

      filters.push(
        {
          field: "users_permissions_user.id",
          operator: "eq",
          value: my_books_only ? user?.id: undefined,
        },
        {
          field: "is_available",
          operator: "eq",
          value: is_available ? is_available: undefined,
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
      return filters;
    },
  });

<<<<<<< HEAD
  console.log("tableProps: ", tableProps);
=======
    console.log("tableProps: ", tableProps);
>>>>>>> 6098390a7cb446cb0091ef54c0bca9300f6961ac

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
/*               filterDropdown={(props) => (
                <FilterDropdown {...props}>
                  <Select
                    allowClear
                    style={{ minWidth: 200 }}
                    mode="multiple"
                    placeholder="Select Owner"
                    {...userSelectProps}
                  />
                </FilterDropdown>
              )} */
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
    <Form
      layout="horizontal"
      {...formProps}
      initialValues={{
        is_available: false,
        my_books_only: true,
    }}
/*       onFinish={(values: any) => {
        console.log('filters values: ', values);
        return values;
      }} */
    >
      <Row>
        <Col flex="1 0 auto">
          <Form.Item label="My books only" name="my_books_only" valuePropName="checked">
            <Checkbox />
          </Form.Item>
        </Col>
        <Col flex="1 0 auto">
          <Form.Item label="Only available" name="is_available" valuePropName="checked">
            <Checkbox />
{/*             <Radio.Group>
              <Radio value={true}>Only available</Radio>
              <Radio value={undefined}>Both</Radio>
            </Radio.Group> */}
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