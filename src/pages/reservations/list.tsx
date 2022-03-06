import {
  IResourceComponentsProps,
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
  useEditableTable,
} from "@pankod/refine-antd";

import { IReservation } from "interfaces";

export const ReservationList: React.FC<IResourceComponentsProps> = () => {
  const { data: user } = useGetIdentity();
  const { tableProps, sorter } = useTable<IReservation>({
    initialSorter: [
      {
        field: "id",
        order: "desc",
      },
    ],
    metaData: {
      populate: [
        "users_permissions_user",
        "book",
        "book.library",
        "book.users_permissions_user",
      ],
    },
    permanentFilter: [
      {
        field: "users_permissions_user.id",
        operator: "eq",
        value: user?.role !== "admin" ? user?.id : undefined,
      },
    ],
  });
  console.log("reserv table props: ", tableProps);

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
          key="[book][id]"
          dataIndex={["book", "data", "attributes", "library", "data", "attributes", "title"]}
          title="Book"
          sorter
        />
        <Table.Column
          key="[user][id]"
          dataIndex={["book", "data", "attributes", "users_permissions_user", "data", "attributes", "username"]}
          title="Onwer"
          sorter
        />
        {user?.role === "admin" && (
          <Table.Column
            key="[user][id]"
            dataIndex={["users_permissions_user", "data", "attributes", "username"]}
            title="User"
            sorter
          />
        )}
        <Table.Column
          key="status"
          dataIndex="status"
          title="Status"
          sorter
        />
        <Table.Column
          dataIndex="comment"
          key="comment"
          title="Comment"
          render={(value) => <TextField value={value} />}
          defaultSortOrder={getDefaultSortOrder("comment", sorter)}
          sorter
        />
        <Table.Column<IReservation>
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
