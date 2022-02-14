import {
  Table,
  TextField,
} from "@pankod/refine-antd";

export const RenderBooks = (props: any) => {

  const dataSource = props;

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
        key="[user][id]"
        dataIndex={["users_permissions_user", "username"]}
        title="Owner"
      />
    </Table>
  );
}