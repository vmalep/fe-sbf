import { Table, TextField } from "@pankod/refine-antd";

import { RenderBooks } from "components/customRenders";

export const RenderLibraries = (props: any) => {

  const { libraries: dataSource, currUser } = props;
  
  return (
    <Table
      dataSource={dataSource}
      expandable={{
        expandedRowRender: record => {
          const books = record.books.filter((book: any) => book.is_available === true);
          return (
            <>
              {RenderBooks({ books, currUser })}
            </>
          )},
        rowExpandable: record => record.books.length > 0
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