import {
  List,
  Table,
  TextField,
  useTable,
  IResourceComponentsProps,
  getDefaultSortOrder,
  Space,
  EditButton,
  DeleteButton,
  ShowButton,
  Select,
  useSelect,
  FilterDropdown,
  useImport,
  ImportButton,
} from "@pankod/refine";
import { ICourse, ILibrary, ISchoolYear } from "interfaces";

export const LibraryList: React.FC<IResourceComponentsProps> = () => {
  const { tableProps, sorter } = useTable<ILibrary>({
    initialSorter: [
      {
        field: "id",
        order: "desc",
      },
    ],
    metaData: {
      populate: [
        'course',
        'course.school_year',
      ],
    },
  });

  console.log(tableProps)

  const { selectProps: selectCourseProps } = useSelect<ICourse>({
    resource: "courses",
    optionLabel: "title",
    optionValue: "id",
  });

  const importProps = useImport<ILibrary>();

  return (
    <List
      pageHeaderProps={{
        extra: <ImportButton {...importProps} />,
      }}
    >
      <Table
        {...tableProps}
        rowKey="id"
        pagination={{
          ...tableProps.pagination,
          pageSize: 20,
        }}
      >
        <Table.Column
          dataIndex="id"
          key="id"
          title="ID"
          render={(value) => <TextField value={value} />}
          defaultSortOrder={getDefaultSortOrder("id", sorter)}
          sorter
        />
        <Table.Column
          dataIndex="title"
          key="title"
          title="Title"
          render={(value) => <TextField value={value} />}
          defaultSortOrder={getDefaultSortOrder("title", sorter)}
          sorter
        />
        <Table.Column
          dataIndex="author"
          key="author"
          title="Author"
          render={(value) => <TextField value={value} />}
          defaultSortOrder={getDefaultSortOrder("author", sorter)}
          sorter
        />
        <Table.Column
          key="[course][id]"
          dataIndex={["course", "data", "attributes", "title"]}
          title="Course"
          render={(value) => <TextField value={value} />}
          sorter
          filterDropdown={(props) => (
            <FilterDropdown {...props}>
              <Select
                style={{ minWidth: 200 }}
                mode="multiple"
                placeholder="Select Courses"
                {...selectCourseProps}
              />
            </FilterDropdown>
          )}
        />
        <Table.Column
          key="[course][id]"
          dataIndex={["course", "data", "attributes", "title"]}
          title="Course"
          render={(value) => <TextField value={value} />}
          sorter
          filterDropdown={(props) => (
            <FilterDropdown {...props}>
              <Select
                style={{ minWidth: 200 }}
                mode="multiple"
                placeholder="Select Courses"
                {...selectCourseProps}
              />
            </FilterDropdown>
          )}
        />
        <Table.Column<ILibrary>
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
  );
};
