import {
  Table,
  TextField,
  Space,
  Button,
} from "@pankod/refine-antd";

import {
  //EyeOutlined,
  FileAddOutlined,
} from "@ant-design/icons";

import HandleReservation from "helpers/handleReservation";

import { IReservation } from "interfaces";

export const RenderReservations = (props: any) => {
  console.log('render res props: ', props);
  const dataSource = props;

  const handleReservation = HandleReservation

  return (
    <Table
      dataSource={dataSource}
      rowKey="id"
      pagination={false}
    >
      <Table.Column
        key="state"
        dataIndex="state"
        title="State"
        sorter
      />
      <Table.Column
        dataIndex="price"
        key="price"
        title="Price"
        render={(value) => <TextField value={value} />}
      />
      <Table.Column
        key="[users_permissions_user][id]"
        dataIndex={["users_permissions_user", "username"]}
        title="Owner"
      />

      <Table.Column<IReservation>
        title="Actions"
        dataIndex="actions"
        render={(_, record) => (
          <Space>
            <Button
              icon={<FileAddOutlined/>}
              onClick={() => handleReservation(record?.id)}
            />
          </Space>
        )}
      />
    </Table>
  );
}