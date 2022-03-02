import { Table, TextField } from "@pankod/refine-antd";

import { RenderBooks } from "components/customRenders";

export const RenderLibraries = (props: any) => {

  const { libraries: dataSource, currUser, show, createReservation } = props;
  
  return (
    <Table
      dataSource={dataSource}
      expandable={{
        expandedRowRender: record => {
          const books = record.books.filter((book: any) => book.is_available === true);
          console.log('books: ', record.books);
          return (
            <>
              {RenderBooks({ books, currUser, show, createReservation })}
            </>
          )},
        rowExpandable: record => record.books.filter((book: any) => book.is_available === true).length > 0
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