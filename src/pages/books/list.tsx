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
  NumberField,
  Select,
  useSelect,
  FilterDropdown,
  BooleanField,
} from "@pankod/refine";
import { IBook, ILibrary, IUser } from "interfaces";

export const BookList: React.FC<IResourceComponentsProps> = () => {
  const { tableProps, sorter } = useTable<IBook>({
    initialSorter: [
      {
        field: "id",
        order: "desc",
      },
    ],
    metaData: {
      populate: "*",
    },
  });

  const { selectProps: selectLibraryProps } = useSelect<ILibrary>({
    resource: "libraries",
    optionLabel: "title",
    optionValue: "id",
  });

  const { selectProps: selectParentProps } = useSelect<IUser>({
    resource: "users",
    optionLabel: "username",
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
          key="[library][id]"
          dataIndex={["library", "data", "attributes", "title"]}
          title="Title"
          sorter
          filterDropdown={(props) => (
            <FilterDropdown {...props}>
              <Select
                style={{ minWidth: 200 }}
                mode="multiple"
                placeholder="Select Title"
                {...selectLibraryProps}
              />
            </FilterDropdown>
          )}
        />
        <Table.Column
          key="[user][id]"
          dataIndex={["users_permissions_user", "data", "attributes", "username"]}
          title="Owner"
          sorter
          filterDropdown={(props) => (
            <FilterDropdown {...props}>
              <Select
                style={{ minWidth: 200 }}
                mode="multiple"
                placeholder="Select Owner"
                {...selectParentProps}
              />
            </FilterDropdown>
          )}
        />
        <Table.Column
          dataIndex="price"
          key="price"
          title="Price"
          render={(value) => <NumberField value={value} />}
          defaultSortOrder={getDefaultSortOrder("title", sorter)}
          sorter
        />
        <Table.Column
          key="is_available"
          dataIndex="is_available"
          title="Available"
          render={(value) => <BooleanField value={value} />}
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
  );
};
