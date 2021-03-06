import {
  IResourceComponentsProps,
  useGetIdentity,
  useNavigation,
} from "@pankod/refine-core";

import {
  List,
  Table,
  Form,
  Select,
  TextField,
  getDefaultSortOrder,
  Space,
  EditButton,
  Input,
  Button,
  SaveButton,
  DeleteButton,
  useEditableTable,
} from "@pankod/refine-antd";

import {
  EyeOutlined,
} from "@ant-design/icons";

import { IReservation } from "interfaces";

export const MyReservationList: React.FC<IResourceComponentsProps> = () => {
  const { data: currUser } = useGetIdentity();
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
  });
  console.log("reservations List tableProps: ", tableProps);
  const { show } = useNavigation();

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
            title="Price (???)"
            sorter
          />
          {currUser?.role === "admin" && (
            <Table.Column
              key="[user][id]"
              dataIndex={["users_permissions_user", "data", "attributes", "username"]}
              title="User"
              sorter
            />
          )}
          <Table.Column
            dataIndex="status"
            key="status"
            title="Status"
            render={(value, record: IReservation) => {
              if (isEditing(record.id)) {
                return (
                  <Form.Item
                    name="status"
                    style={{ margin: 0 }}
                  >
                    <Select
                      defaultValue={value}
                      options={[
                        { label: "Interested", value: "interested" },
                        { label: "Proposed", value: "proposed" },
                      ]}
                    />
                  </Form.Item>
                );
              }
              return <TextField value={value} />;
            }}
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
                    resource="reservations"
                  />
                  <DeleteButton
                    recordItemId={record.id}
                    hideText
                    size="small"
                    resource="reservations"
                  />
                  <Button
                    icon={<EyeOutlined />}
                    onClick={(): void =>
                      show("books", `${record?.book.id}`)
                    }
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
