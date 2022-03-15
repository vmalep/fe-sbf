import {
  useGetIdentity,
} from "@pankod/refine-core";

import {
  List,
  Table,
  Form,
  Select,
  TextField,
  Space,
  EditButton,
  Input,
  Button,
  SaveButton,
  DeleteButton,
  useEditableTable,
} from "@pankod/refine-antd";

import { IReservation } from "interfaces";

export const RenderReservations = (props: string) => {
  const bookId = props;
  const { data: currUser } = useGetIdentity();
  const {
    tableProps,
    formProps,
    isEditing,
    setId: setEditId,
    saveButtonProps,
    cancelButtonProps,
    editButtonProps,
  } = useEditableTable<IReservation>({
    resource: "reservations",
    permanentFilter: [
      {
        field: "users_permissions_user.id",
        operator: "eq",
        value: currUser?.id,
      },
      {
        field: "book.id",
        operator: "eq",
        value: bookId,
      },
    ],
  });

  return (
    <List title="Reservation">
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
          />
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