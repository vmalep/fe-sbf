import {
  Table,
  Form,
  useEditableTable,
  Space,
  Button,
  EditButton,
  SaveButton,
} from "@pankod/refine-antd";

/* import {
  //EyeOutlined,
  FileAddOutlined,
} from "@ant-design/icons"; */

import { IReservation } from "interfaces";

export const RenderReservations = (props: any) => {
  //console.log('render res props: ', props);
  const selectedReservationIds = props.map((reservation: any) => reservation.id);
  console.log('selectedReservationIds: ', selectedReservationIds);

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
        field: "id",
        operator: "in",
        value: selectedReservationIds,
      },
    ],
  });

  return (
    <Form {...formProps}>
    <Table
      {...tableProps}
      rowKey="id"
      pagination={false}
    >
      <Table.Column
        key="id"
        dataIndex={["users_permissions_user", "username"]}
        title="User"
      />
      <Table.Column
        key="comment"
        dataIndex="comment"
        title="Comment"
        sorter
      />
      <Table.Column
        key="status"
        dataIndex="status"
        title="Status"
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
                  <EditButton
                    {...editButtonProps(record.id)}
                    hideText
                    size="small"
                  />
              );
            }}
          />
{/*       <Table.Column<IReservation>
        title="Actions"
        dataIndex="actions"
        render={(_, record) => (
          <Space>
            <Button
              icon={<FileAddOutlined />}
              onClick={() => handleReservation(record?.id)}
            />
          </Space>
        )}
      /> */}
    </Table>
    </Form>
  );
}