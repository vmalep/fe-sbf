import { Table, TextField } from "@pankod/refine-antd";

import { RenderBooks } from "components/customRenders";

export const RenderLibraries = (props: any) => {

  const dataSource = props;
  
  const expandedRowRender = (record: any) => {
    if (record.books.length === 0) {
      return (
        <>No book</>
      )
    }
    else {
      const availableBooks = record.books.filter((book: any) => book.is_available === true);
      return (
        <>
          {RenderBooks(availableBooks)}
        </>
      );
    }
  };

  return (
    <Table
      dataSource={dataSource}
      expandable={{ expandedRowRender }}
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