import {
  Table,
  //Space,
  //Button,
  TextField,
  Select,
  List,
  Form,
} from "@pankod/refine-antd";

//import routerProvider from "@pankod/refine-react-router";

//import { EditOutlined } from "@ant-design/icons";
//import { IReservation } from "interfaces";

export const RenderReservations = (props: any) => {
  //console.log('render res props: ', props);
  const {
    reservationsIds,
    updateReservation,
    filteredReservationsTableProps: tableProps,
    formProps,
    isEditing,
    setEditId,
    saveButtonProps,
    cancelButtonProps,
    editButtonProps,
  } = props;
  //console.log('dataSource: ', reservations);
  //const Link = routerProvider.Link;
  console.log('reservationsTableProps: ', tableProps)

  return (
      <Form {...formProps}>
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
            key="status"
            dataIndex="status"
            title="Status"
            render={(value: any, record: any) => {
              if (
                (value === "proposed") ||
                //(value === "confirmed") || When confirmed, the owner should not be able to modify it anymore...
                (value === "rejected")
              ) {
                return (
                  <Select
                    defaultValue={value}
                    options={[
                      { label: "Proposed", value: "proposed" },
                      { label: "Confirmed", value: "confirmed" },
                      { label: "Rejected", value: "rejected" },
                    ]}
                    onSelect={() => {
                      console.log('handleChange:');
                      console.log('value: ', value);
                      console.log('record: ', record);
                      updateReservation({
                        resource: "reservations",
                        id: record.id,
                        values: { status: value },
                      })
                    }}
                  />
                )
              }
              return <TextField value={value} />;
            }}
          />
        </Table>
      </Form>
  );
}