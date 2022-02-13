import {
useNavigation,
useTranslate
} from "@pankod/refine-core";

import { Card, Table, TextField } from "@pankod/refine-antd";

import NormalizeData from "helpers/normalizeData";

export const RenderLibraries = (props: any) => {

  const dataSource = NormalizeData(props?.data);

  const { show } = useNavigation();
  const { Meta } = Card;

  const t = useTranslate();

  return (
    <Card>
      <Meta title="Library" />
      <Table
        dataSource={dataSource}
        onRow={(record) => {
          return {
            onClick: () => {
              show("libraries", record.id);
            },
          };
        }}
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
    </Card>
  );
}