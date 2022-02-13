import {
  Card,
  Table,
  TextField,
} from "@pankod/refine-antd";

export const RenderBooks = (props: any) => {

  const dataSource = props;

  console.log("books data source: ", dataSource);

  return (
    <Table
      dataSource={dataSource}
      rowKey="id"
    >
      <Table.Column
        dataIndex="id"
        key="id"
        title="ID"
        render={(value) => <TextField value={value} />}
        sorter
      />
      <Table.Column
        key="[user][id]"
        dataIndex={["users_permissions_user", "username"]}
        title="Owner"
        sorter
      />
      <Table.Column
        dataIndex="price"
        key="price"
        title="Price"
        render={(value) => <TextField value={value} />}
        sorter
      />
    </Table>
  );
}