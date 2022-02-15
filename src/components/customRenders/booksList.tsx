import {
  Table,
  TextField,
  ShowButton,
  Space,
  Button,
} from "@pankod/refine-antd";
import {
  //useNavigation,
} from "@pankod/refine-core";
import {
  EyeOutlined,
  FileAddOutlined,
} from "@ant-design/icons";

import { IBook } from "interfaces";

import CreateReservation from "../../helpers/createReservation";

export const RenderBooks = (props: any) => {
  const dataSource = props;
  //const { show } = useNavigation();

  console.log('ds book: ', dataSource);

  return (
    <Table
      dataSource={dataSource}
      rowKey="id"
      pagination={false}
    >
      <Table.Column
        key="state"
        dataIndex="state"
        title="State"
        sorter
      />
      <Table.Column
        dataIndex="price"
        key="price"
        title="Price"
        render={(value) => <TextField value={value} />}
      />
      <Table.Column
        key="[users_permissions_user][id]"
        dataIndex={["users_permissions_user", "username"]}
        title="Owner"
      />

      <Table.Column<IBook>
        title="Actions"
        dataIndex="actions"
        render={(_, record) => (
          <Space>
            <Button
              icon={<FileAddOutlined/>}
              onClick={() => CreateReservation(record?.id)}
            />
            <ShowButton
              hideText
              size="small"
              resourceName="books"
              recordItemId={record.id}
            />
{/*             <Button
              icon={<EyeOutlined />}
              onClick={(): void =>
                console.log("books", `${record?.id}`)
              }
            />
 */}          </Space>
        )}
      />
    </Table>
  );
}