import {
  IResourceComponentsProps,
  useGetIdentity,
  useNavigation,
  useDelete,
} from "@pankod/refine-core";

import {
  List,
  Table,
  TextField,
  useTable,
  getDefaultSortOrder,
  Space,
  Button,
} from "@pankod/refine-antd";

import { IReservation } from "interfaces";

import {
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";

export const MyReservationsList: React.FC<IResourceComponentsProps> = () => {
  const { data: user } = useGetIdentity();
  const { show, edit } = useNavigation();
  const { mutate: mutateDelete } = useDelete();

  const { tableProps, sorter } = useTable<IReservation>({
    resource: "reservations",
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
              <Button
                icon={<EyeOutlined />}
                onClick={(): void =>
                  show("books", `${record?.id}`) /* ToDo: Returning undefined as ressource */
                }
              />
              <Button
                icon={<EditOutlined />}
                onClick={(): void =>
                  edit("books", `${record?.id}`) /* ToDo: Returning undefined as ressource */
                }
              />
              <Button
                icon={<DeleteOutlined />}
                onClick={() => {
                  const id = record?.id
                  mutateDelete({        /* ToDo: Returning error 405 (not allowed) */
                    resource: "books",
                    id,
                  });
                }}
              />
            </Space>
          )}
        />
      </Table>
    </List>
  );
};
