import {
  Table,
  TextField,
  Space,
  Button,
  //Select,
} from "@pankod/refine-antd";

import {
  EyeOutlined,
  CheckSquareOutlined,
  CheckSquareFilled,
} from "@ant-design/icons";

//import { IBook } from "interfaces";

export const RenderBooks = (props: any) => {
  const { books: dataSource, currUser, show, createReservation } = props;
  //console.log('bookList dataSource: ', dataSource);
  console.log('currUser: ', currUser);
  const currRole = currUser?.role;

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
      {(currRole) && ( // Todo: add a test on existing a username or nor...
        <>
          <Table.Column
            key="[users_permissions_user][id]"
            dataIndex={["users_permissions_user", "username"]}
            title="Owner"
          />
        </>
      )}
      {currRole && (
        <Table.Column
          title="Actions"
          dataIndex="actions"
          render={(_, record: any) => {
            console.log('record: ', record);
            const myReservation = record.reservations.filter((reservation: any) => reservation?.users_permissions_user.id === currUser.id)[0];
            return (
              <Space>
                {(!myReservation) && (
                  <Button
                    icon={<CheckSquareOutlined />}
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
                )}
                {(myReservation) && <CheckSquareFilled style={{ fontSize: '32px' }} />}
                <Button
                  icon={<EyeOutlined />}
                  onClick={(): void =>
                    show("books", `${record?.id}`)
                  }
                />
              </Space>
            )
          }}
        />
      )}
    </Table>
  );
}