import { Card, Table, TextField } from "@pankod/refine-antd";

import { RenderLibraries } from "components/customRenders";

export const RenderCourses = (props: any) => {

  const {normalizedCourses: dataSource, currUser } = props;

  console.log('curruser: ', currUser);
  return (
    <Table
      dataSource={dataSource}
      rowKey="id"
      scroll={{ x: 400 }}
    >
      <Table.Column
        dataIndex="title"
        key="title"
        title="Course"
        render={(value) => <TextField value={value} />}
      />
      <Table.Column
        render={(record) => {
          return <Card>{RenderLibraries(record?.libraries)}</Card> 
        }}
      />
    </Table>
  );
}