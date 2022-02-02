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
import { ICourse } from "interfaces";

export const CourseList: React.FC<IResourceComponentsProps> = () => {
  const { tableProps, sorter } = useTable<ICourse>({
    initialSorter: [
      {
        field: "id",
        order: "desc",
      },
    ],
    metaData: {
      populate: ["libraries"],
    },
  });

  const { selectProps } = useSelect({
    resource: "libraries",
    optionLabel: "title",
    optionValue: "id",
  });
  console.log(tableProps);

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
          key="[libraries][id]"
          dataIndex={["libraries", "data", "attributes", "title"]}
          title="Libraries"
          filterDropdown={(props) => (
            <FilterDropdown {...props}>
              <Select
                style={{ minWidth: 200 }}
                mode="multiple"
                placeholder="Select Library"
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
