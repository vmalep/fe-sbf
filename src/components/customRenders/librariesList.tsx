import {
  //useNavigation,
  //useTranslate
} from "@pankod/refine-core";

import { Table, TextField } from "@pankod/refine-antd";

//import NormalizeData from "helpers/normalizeData";

export const RenderLibraries = (props: any) => {

  console.log('props: ', props)

  const dataSource = props;

  //const t = useTranslate(); // provoke hooks error

  console.log('libraries datasource: ', dataSource);

  return (
    <Table
      dataSource={dataSource}
      rowKey="id"
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