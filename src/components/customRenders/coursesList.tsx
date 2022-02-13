import {
  //useNavigation,
  useTranslate
} from "@pankod/refine-core";

import { Card, Table, TextField } from "@pankod/refine-antd";

import NormalizeData from "helpers/normalizeData";

import { RenderLibraries } from "components/customRenders"
import { ICourse, ILibrary } from "interfaces";

export const RenderCourses = (props: any) => {

  const dataSource = NormalizeData(props?.data);

  //const { show } = useNavigation();
  const { Meta } = Card;

  const t = useTranslate();

  const expandedRowRender = (record: any) => {
    if (record.libraries.length > 0) {
      console.log('expanded record: ', record.libraries);
      return (
        <>
          {RenderLibraries(record?.libraries)}
        </>
      );
    }
    else {
      console.log('no lib');
      return (
        <>No library</>
      )
    }
  };

  return (
    <Card>
      <Meta title="Courses" />
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