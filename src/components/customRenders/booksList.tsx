import {
  Table,
  TextField,
  //ShowButton,
  Space,
  Button,
} from "@pankod/refine-antd";

import {
  EyeOutlined,
  FileAddOutlined,
} from "@ant-design/icons";

import HandleReservation from "helpers/handleReservation";

import { IBook } from "interfaces";

export const RenderBooks = (props: any) => {
  const { books: dataSource, currUser, show } = props;

  const currRole = currUser?.role;
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

      {currRole && (
        <>
          <Table.Column
            key="[users_permissions_user][id]"
            dataIndex={["users_permissions_user", "username"]}
            title="Owner"
          />
          <Table.Column<IBook>
            title="Actions"
            dataIndex="actions"
            render={(_, record) => (
              <Space>
                {<Button
                  icon={<FileAddOutlined />}
                  onClick={() => handleReservation(record?.id)}
                />}
                {/*                 <ShowButton
                  hideText
                  size="small"
                  resourceName="books"
                  recordItemId={record.id}
                /> */}
                <Button
                  icon={<EyeOutlined />}
                  onClick={(): void =>
                    show("books", `${record?.id}`)
                  }
                />
              </Space>
            )}
          />
        </>
      )}

    </Table>
  );
}