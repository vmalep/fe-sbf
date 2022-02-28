import { IResourceComponentsProps, useGetIdentity } from "@pankod/refine-core";

import {
  List,
  Table,
  TextField,
  useTable,
  getDefaultSortOrder,
  Space,
  ShowButton,
  EditButton,
  DeleteButton,
} from "@pankod/refine-antd";

import { IUser } from "interfaces";

export const UserList: React.FC<IResourceComponentsProps> = () => {
  const { data: user } = useGetIdentity();
  console.log('current user: ', user);
  const { tableProps, sorter } = useTable<IUser>({
    initialSorter: [
      {
        field: "id",
        order: "desc",
      },
    ],
  });
  //console.log(tableProps);

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
              {
                user?.role === "admin" &&
                (
                  <>
                    <EditButton hideText size="small" recordItemId={record.id} />
                    <DeleteButton hideText size="small" recordItemId={record.id} />
                  </>
                )
              }
            </Space>
          )}
        />
      </Table>
    </List>
  );
};
