import { Card, Table, TextField } from "@pankod/refine-antd";

import { RenderLibraries } from "components/customRenders";

export const RenderCourses = (props: any) => {

  const dataSource = props;

  const expandedRowRender = (record: any) => {
    if (record.libraries.length > 0) {
      return (
        <>
          {RenderLibraries(record?.libraries)}
        </>
      );
    }
    else {
      return (
        <>No library</>
      )
    }
  };

  return (
    <Card>
      <Table
        dataSource={dataSource}
        expandable={{ expandedRowRender }}
        rowKey="id"
        scroll={{ x: 400 }}
      >
        <Table.Column
          dataIndex="id"
          key="id"
          title="ID"
          render={(value) => <TextField value={value} />}
          sorter
        />
        <Table.Column
          dataIndex="title"
          key="title"
          title="Title"
          render={(value) => <TextField value={value} />}
          sorter
        />
      </Table>
    </Card>
  );
}