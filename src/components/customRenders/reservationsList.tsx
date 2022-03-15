import {
  Table,
  Space,
  Button,
  TextField,
  Select,
} from "@pankod/refine-antd";

import routerProvider from "@pankod/refine-react-router";

import { EditOutlined } from "@ant-design/icons";
import { IReservation } from "interfaces";

export const RenderReservations = (props: any) => {
  //console.log('render res props: ', props);
  const dataSource = props;
  console.log('dataSource: ', dataSource);
  const Link = routerProvider.Link;

  function handleChangeStatus(value: any) {
    console.log(value);
  }

  return (
    <Table
      dataSource={dataSource}
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
            (value === "confirmed") ||
            (value === "rejected")
          ) {
            return (
              <Select
                defaultValue={value}
                options={[
                  { label: "Proposed", value: "proposed" },
                  { label: "Confirmed", value: "confirmed" },
                  { label: "rejected", value: "rejected" },
                ]}
                onChange={handleChangeStatus}
              />
            )
          }
          return <TextField value={value} />;
        }}
      />
{/*       <Table.Column<IReservation>
        title="Actions"
        dataIndex="actions"
        render={(_, record) => (
          <Space>
            <Link to={`/reservations/edit/${record.id}`}>
              <Button icon={<EditOutlined/>} />
            </Link>
          </Space>
        )}
      /> */}
    </Table>
  );
}