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

import { IBook } from "interfaces";

/* import GetBookTitle from "helpers/getBookTitle";
import { useEffect } from "react"; */

export const RenderBooks = (props: any) => {
  const { books: dataSource, currUser, show, createReservation } = props;
/*   useEffect(() => {
    dataSource?.forEach((item: any) => item.title = GetBookTitle(item.id));
  }, [dataSource])
  console.log('ds: ', dataSource); */

  const currRole = currUser?.role;
  console.log('currRole: ', currRole);

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
{/*       <Table.Column
        dataIndex="id"
        key="id"
        render={(value) => <TextField value={GetBookTitle(value)}}
      /> */}
      {(currRole) && ( // Todo: add a test on existing a username or nor...
        <Table.Column
          key="[users_permissions_user][id]"
          dataIndex={["users_permissions_user", "username"]}
          title="Owner"
        />
      )}
      {currRole && (
        <Table.Column<IBook>
          title="Actions"
          dataIndex="actions"
          render={(_, record) => (
            <Space>
              <Button
                icon={<FileAddOutlined />}
                onClick={() => {
                  createReservation({
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
      )}
    </Table>
  );
}