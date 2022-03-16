import {
  Table,
  Space,
  Button,
  SaveButton,
  EditButton,
  TextField,
  Select,
  Form,
} from "@pankod/refine-antd";

import { IReservation } from "interfaces";

export const RenderReservations = (props: any) => {
  const {
    filteredReservationsTableProps: tableProps,
    formProps,
    isEditing,
    setEditId,
    saveButtonProps,
    cancelButtonProps,
    editButtonProps,
  } = props;

  return (
    <Form
      {...formProps}
      onFinish={(values: any) => {
        console.log('values: ', values);
        return formProps.onFinish?.({
          ...values,
        });
      }}
    >
      <Table
        {...tableProps}
        pagination={false}
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
          key="[user][id]"
          dataIndex={["users_permissions_user", "data", "attributes", "username"]}
          title="User"
          sorter
        />
        <Table.Column
          key="comment"
          dataIndex="comment"
          title="Comment"
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
                      { label: "Proposed", value: "proposed" },
                      { label: "Confirmed", value: "confirmed" },
                      { label: "Rejected", value: "rejected" },
                    ]}
                  />
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
                  disabled={record.status === "interested"}
                />
              </Space>
            );
          }}
        />
      </Table>
    </Form>
  );
}