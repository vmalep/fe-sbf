import { IResourceComponentsProps } from "@pankod/refine-core";

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
} from "@pankod/refine-antd";

import { IReservation } from "interfaces";

export const ReservationList: React.FC<IResourceComponentsProps> = () => {
  const { tableProps, sorter } = useTable<IReservation>({
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
          key="[user][id]"
          dataIndex={["users_permissions_user", "data", "attributes", "username"]}
          title="Owner"
          sorter
        />
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
