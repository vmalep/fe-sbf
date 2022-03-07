import {
  Table,
  TextField,
  Space,
  Button,
  Select,
} from "@pankod/refine-antd";

import {
  EyeOutlined,
  FileAddOutlined,
} from "@ant-design/icons";

import { IBook } from "interfaces";

export const RenderBooks = (props: any) => {
  const { books: dataSource, currUser, show, createReservation } = props;
  //console.log('bookList dataSource: ', dataSource);
  const currRole = currUser?.role;
  //console.log('currRole: ', currRole);

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
          <Table.Column
            dataIndex="reservations"
            key="reservStatus"
            title="Reservation status"
            render={(value: any, record: any) => {
              console.log('value: ', value);
              if (value.length === 0) {
                return (
                  <Select
                    defaultValue={"Select"}
                    style={{ width: 120 }}
                    options={[
                      {label: "Interested", value: "interested"},
                    ]}
                    onChange={() => {
                      console.log("interested");
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
                )
              }
              const myReservation = value.filter((reservation: any) => reservation?.users_permissions_user.id === currUser.id)[0];
              return Object.prototype.toString.call(myReservation) === '[object Object]' ? myReservation.status : null;
            }}
          />
        </>
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