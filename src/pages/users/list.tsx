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
} from "@pankod/refine";
import { IUser } from "interfaces";

export const UserList: React.FC<IResourceComponentsProps> = () => {
  const { tableProps, sorter } = useTable<IUser>({
    initialSorter: [
      {
        field: "id",
        order: "desc",
      },
    ],
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
          dataIndex="username"
          key="username"
          title="Username"
          render={(value) => <TextField value={value} />}
          defaultSortOrder={getDefaultSortOrder("username", sorter)}
          sorter
        />
        <Table.Column
          dataIndex="email"
          key="email"
          title="Email"
          render={(value) => <TextField value={value} />}
          defaultSortOrder={getDefaultSortOrder("email", sorter)}
          sorter
        />
        <Table.Column
          dataIndex="firstname"
          key="email"
          title="Firstname"
          render={(value) => <TextField value={value} />}
          defaultSortOrder={getDefaultSortOrder("firstname", sorter)}
          sorter
        />
        <Table.Column
          dataIndex="lastname"
          key="lastname"
          title="Lastname"
          render={(value) => <TextField value={value} />}
          defaultSortOrder={getDefaultSortOrder("lastname", sorter)}
          sorter
        />
        <Table.Column<IUser>
          title="Actions"
          dataIndex="actions"
          render={(_, record) => (
            <Space>
              <ShowButton hideText size="small" recordItemId={record.id} />
{/*               <EditButton hideText size="small" recordItemId={record.id} />
              <DeleteButton hideText size="small" recordItemId={record.id} /> */}
            </Space>
          )}
        />
      </Table>
    </List>
  );
};
