import {
  IResourceComponentsProps,
  //CrudFilters,
  HttpError,
  useGetIdentity
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
  Card,
} from "@pankod/refine-antd";

import {
  IBook,
  IUser,
  ILibrary,
  ICourse,
  ISchoolYear,
  IBookFilterVariables,
} from "interfaces";

export const MyBooksList: React.FC<IResourceComponentsProps> = () => {
  const { data: user } = useGetIdentity();
  const { tableProps, sorter } = useTable<IBook, HttpError, IBookFilterVariables>({
    resource: "books",
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
    permanentFilter: [
      {
        field: "users_permissions_user.id",
        operator: "eq",
        value: user?.id,
      },
    ],
  });

  console.log('my books, tableProps: ', tableProps);

  const { selectProps: librarySelectProps } = useSelect<ILibrary>({
    resource: "libraries",
  });

  const { selectProps: SchoolYearSelectProps } = useSelect<ISchoolYear>({
    resource: "school-years",
  });

  const { selectProps: courseSelectProps } = useSelect<ICourse>({
    resource: "courses",
  });

  return (
    <>
      <Card title="My books">
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
