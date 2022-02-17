import { useCreate } from "@pankod/refine-core";

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

import { IBook, IReservation } from "interfaces";

export const RenderBooks = (props: any) => {
  const { books: dataSource, currUser, show } = props;

  const currRole = currUser?.role;
  const { mutate } = useCreate<IReservation>();

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
                <Button
                  icon={<FileAddOutlined />}
                  onClick={() => {
                    mutate({
                      resource: "reservations",
                      values: {
                        book: record?.id,
                        users_permissions_user: currUser.id,
                        status: "interested"
                      }
                    })
                  }}
                />
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