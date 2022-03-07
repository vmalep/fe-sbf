import { Table, TextField } from "@pankod/refine-antd";

import { RenderBooks } from "components/customRenders";

export const RenderLibraries = (props: any) => {

  const { libraries: dataSource, currUser, show, createReservation, includesMyBooks } = props;
  
  return (
    <Table
      dataSource={dataSource}
      expandable={{
        expandedRowRender: record => {
          const books = record.books.filter((book: any) => (book.is_available === true) && (!currUser?.id || (includesMyBooks || (book.users_permissions_user?.id !== currUser?.id))));
          return (
            <>
              {RenderBooks({ books, currUser, show, createReservation })}
            </>
          )},
        rowExpandable: record => record.books.filter((book: any) => (book.is_available === true) && (!currUser?.id || (includesMyBooks || (book.users_permissions_user?.id !== currUser?.id)))).length > 0
      }}
      rowKey="id"
      scroll={{ x: 400 }}
      pagination={false} 
    >
      <Table.Column
        dataIndex="title"
        key="title"
        title="Title"
        render={(value) => <TextField value={value} />}
      />
      <Table.Column
        dataIndex="isdn"
        key="isdn"
        title="ISDN"
        render={(value) => <TextField value={value} />}
      />
    </Table>
  );
}