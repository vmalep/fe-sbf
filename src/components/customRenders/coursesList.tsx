import {
  useNavigation,
  useTranslate
  } from "@pankod/refine-core";
  
  import { Card, Table, TextField } from "@pankod/refine-antd";

  
  import NormalizeData from "helpers/normalizeData";
  
  export const RenderCourses = (props: any) => {
  
    const dataSource = NormalizeData(props?.data);
  
    const { show } = useNavigation();
    const { Meta } = Card;
  
    const t = useTranslate();
  
    return (
      <Card>
        <Meta title="Courses" />
        <Table
          dataSource={dataSource}
          onRow={(record) => {
            return {
              onClick: () => {
                show("courses", record.id);
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
        </Table>
      </Card>
    );
  }