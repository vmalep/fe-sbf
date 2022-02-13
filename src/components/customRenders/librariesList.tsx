import { Card, Table, TextField } from "@pankod/refine-antd";

import { RenderBooks } from "components/customRenders";

export const RenderLibraries = (props: any) => {

  console.log('props: ', props)

  const dataSource = props;

  console.log('libraries datasource: ', dataSource);

  const expandedRowRender = (record: any) => {
    if (record.books.length > 0) {
      console.log('expanded record: ', record.books);
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
      pagination={{ pageSizeOptions: ['20', '40', '60', '80'] }}
    >
      <Table.Column
        key="[course][id]"
        dataIndex={["course", "title"]}
        title="Course"
        render={(value) => <TextField value={value} />}
      />
      <Table.Column
        dataIndex="title"
        key="title"
        title="Title"
        render={(value) => <TextField value={value} />}
        sorter
      />
      <Table.Column
        dataIndex="isdn"
        key="isdn"
        title="ISDN"
        render={(value) => <TextField value={value} />}
        sorter
      />
    </Table>
  );
}