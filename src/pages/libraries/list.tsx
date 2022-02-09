import { IResourceComponentsProps, useExport } from "@pankod/refine-core";

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
  Select,
  useSelect,
  FilterDropdown,
  useImport,
  ImportButton,
  ExportButton,
  CreateButton,
} from "@pankod/refine-antd";

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
/*     initialFilter: [
      {
          field: "school_year",
          operator: "eq",
          value: localStorage.getItem("selectedSchoolYearId"),
      },
  ], */
  });

  console.log('selected school year id: ', localStorage.getItem("selectedSchoolYearId"));
  console.log(tableProps);

  const { selectProps: selectCourseProps } = useSelect<ICourse>({
    resource: "courses",
    optionLabel: "title",
    optionValue: "id",
  });

  const { selectProps: selectSchoolYearProps } = useSelect<ICourse>({
    resource: "school-years",
    optionLabel: "title",
    optionValue: "id",
  });

  const importProps = useImport<ILibrary>();
  const { triggerExport, isLoading } = useExport<ILibrary>();

  return (
    <List
      pageHeaderProps={{
        extra: (
          <>
            <ImportButton {...importProps} />
            <ExportButton onClick={triggerExport} loading={isLoading} />
            <CreateButton />
          </>
        ),
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
                placeholder="Select Course"
                {...selectCourseProps}
              />
            </FilterDropdown>
          )}
        />
        <Table.Column
          key="[school_year][id]"
          dataIndex={["course", "data", "attributes", "school_year", "data", "attributes", "title"]}
          title="School year"
          render={(value) => <TextField value={value} />}
          sorter
          filterDropdown={(props) => (
            <FilterDropdown {...props}>
              <Select
                style={{ minWidth: 200 }}
                mode="multiple"
                placeholder="Select School year"
                {...selectSchoolYearProps}
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
