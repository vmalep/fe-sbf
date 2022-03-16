import {
  Table,
  //Space,
  //Button,
  TextField,
  Select,
} from "@pankod/refine-antd";

//import routerProvider from "@pankod/refine-react-router";

//import { EditOutlined } from "@ant-design/icons";
//import { IReservation } from "interfaces";

export const RenderReservations = (props: any) => {
  //console.log('render res props: ', props);
  const { reservations, updateReservation } = props;
  //console.log('dataSource: ', reservations);
  //const Link = routerProvider.Link;

  return (
    <Table
      dataSource={reservations}
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
  );
}