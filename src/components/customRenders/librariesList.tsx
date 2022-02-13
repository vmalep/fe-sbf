import { Table, TextField } from "@pankod/refine-antd";

import { RenderBooks } from "components/customRenders";

export const RenderLibraries = (props: any) => {

  const dataSource = props;

  const expandedRowRender = (record: any) => {
    if (record.books.length > 0) {
      return (
        <>
          {RenderBooks(record?.books)}
        </>
      );
    }
    else {
      return (
        <>No book</>
      )
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