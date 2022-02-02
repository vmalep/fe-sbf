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
} from "@pankod/refine";
import { ICourse, ISchoolYear } from "interfaces";

export const CourseList: React.FC<IResourceComponentsProps> = () => {
  const { tableProps, sorter } = useTable<ICourse>({
    initialSorter: [
      {
        field: "id",
        order: "desc",
      },
    ],
    metaData: {
      populate: ["school_year"],
    },
  });

  const { selectProps } = useSelect<ISchoolYear>({
    resource: "school-years",
    optionLabel: "title",
    optionValue: "id",
  });

  return (
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
          dataIndex="title"
          key="title"
          title="Title"
          render={(value) => <TextField value={value} />}
          defaultSortOrder={getDefaultSortOrder("title", sorter)}
          sorter
        />
        <Table.Column
          key="[school_year][id]"
          dataIndex={["school_year", "data", "attributes", "title"]}
          title="School year"
          filterDropdown={(props) => (
            <FilterDropdown {...props}>
              <Select
                style={{ minWidth: 200 }}
                mode="multiple"
                placeholder="Select School year"
                {...selectProps}
              />
            </FilterDropdown>
          )}
        />
        <Table.Column<ICourse>
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
