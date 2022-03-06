import {
  Table,
  Space,
  Button,
} from "@pankod/refine-antd";

import routerProvider from "@pankod/refine-react-router";

import {
  //EyeOutlined,
  FileAddOutlined,
} from "@ant-design/icons";
import { EditOutlined } from "@ant-design/icons";
import { IReservation } from "interfaces";

export const RenderReservations = (props: any) => {
  //console.log('render res props: ', props);
  const dataSource = props;
  console.log('dataSource: ', dataSource);
  const Link = routerProvider.Link;

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
        sorter
      />
      <Table.Column<IReservation>
        title="Actions"
        dataIndex="actions"
        render={(_, record) => (
          <Space>
            <Link to={`/reservations/edit/${record.id}`}>
              <Button icon={<EditOutlined/>} />
            </Link>
          </Space>
        )}
      />
    </Table>
  );
}