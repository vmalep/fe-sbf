import {
  IResourceComponentsProps,
  useGetIdentity,
} from "@pankod/refine-core";

import {
  List,
  Table,
  Form,
  TextField,
  useTable,
  getDefaultSortOrder,
  Space,
  EditButton,
  Input,
  Button,
  SaveButton,
  DeleteButton,
  ShowButton,
  useEditableTable,
} from "@pankod/refine-antd";

import { IReservation } from "interfaces";

export const ReservationList: React.FC<IResourceComponentsProps> = () => {
  const { data: user } = useGetIdentity();
  const {
    tableProps,
    formProps,
    isEditing,
    setId: setEditId,
    saveButtonProps,
    cancelButtonProps,
    editButtonProps,
    sorter
  } = useEditableTable<IReservation>({
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
      <Form {...formProps}>
        <Table
          {...tableProps}
          rowKey="id"
          onRow={(record) => ({
            onClick: (event: any) => {
              if (event.target.nodeName === "TD") {
                setEditId && setEditId(record.id);
              }
            },
          })}
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
            key="[book][id]"
            dataIndex={["book", "data", "attributes", "library", "data", "attributes", "title"]}
            title="Book"
            sorter
          />
          <Table.Column
            key="[user][id]"
            dataIndex={["book", "data", "attributes", "users_permissions_user", "data", "attributes", "username"]}
            title="Owner"
            sorter
          />
          <Table.Column
            key="[user][id]"
            dataIndex={["book", "data", "attributes", "price"]}
            title="Owner"
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
            render={(value, record: IReservation) => {
              if (isEditing(record.id)) {
                return (
                  <Form.Item
                    name="comment"
                    style={{ margin: 0 }}
                  >
                    <Input />
                  </Form.Item>
                );
              }
              return <TextField value={value} />;
            }}
            defaultSortOrder={getDefaultSortOrder("comment", sorter)}
            sorter
          />
          <Table.Column<IReservation>
            title="Actions"
            dataIndex="actions"
            render={(_, record) => {
              if (isEditing(record.id)) {
                return (
                  <Space>
                    <SaveButton
                      {...saveButtonProps}
                      hideText
                      size="small"
                    />
                    <Button
                      {...cancelButtonProps}
                      size="small"
                    >
                      Cancel
                    </Button>
                  </Space>
                );
              }
              return (
                <Space>
                  <EditButton
                    {...editButtonProps(record.id)}
                    hideText
                    size="small"
                  />
                  <DeleteButton
                    recordItemId={record.id}
                    hideText
                    size="small"
                  />
                </Space>
              );
            }}
          />
        </Table>
      </Form>
    </List>
  );
};
