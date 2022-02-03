import {
  Card,
  Table,
  TextField,
  useNavigation,
  Dropdown,
  Icons,
  Menu,
  useDelete,
  useTranslate,
  useTable
} from "@pankod/refine";

import { ILibrary } from "interfaces";

export interface RenderLibrariesPropTypes {
  record?: {
    libraries: {
      data: {
        id: string;
        attributes: ILibrary;
      };
    };
  }
}
const { CloseCircleOutlined, CheckCircleOutlined } = Icons;

export const RenderLibraries = (props: RenderLibrariesPropTypes) => {

  console.log('props:' , props.record);
  const { tableProps } = useTable<ILibrary>({
    resource: "libraries",
  });

  const { show, edit } = useNavigation();
  const { Meta } = Card;

  const t = useTranslate();

  const { mutate: mutateDelete } = useDelete();

  const moreMenu = (id: string) => (
    <Menu
      mode="vertical"
      onClick={({ domEvent }) => domEvent.stopPropagation()}
    >
      <Menu.Item
        key="accept"
        style={{
          fontSize: 15,
          display: "flex",
          alignItems: "center",
          fontWeight: 500,
        }}
        icon={
          <Icons.EditOutlined
            style={{
              color: "#52c41a",
              fontSize: 17,
              fontWeight: 500,
            }}
          />
        }
        onClick={() => {
          edit("branches", id);
        }}
      >
        {t("buttons.edit")}
      </Menu.Item>
      <Menu.Item
        key="reject"
        style={{
          fontSize: 15,
          display: "flex",
          alignItems: "center",
          fontWeight: 500,
        }}
        icon={
          <Icons.CloseCircleOutlined
            style={{
              color: "#EE2A1E",
              fontSize: 17,
            }}
          />
        }
        onClick={() => {
          mutateDelete({
            resource: "branches",
            id,
            mutationMode: "undoable",
          });
        }}
      >
        {t("buttons.delete")}
      </Menu.Item>
    </Menu>
  );

  return (
    <Card>
      <Meta title="Library" />
      <Table
        {...tableProps}
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
        <Table.Column<ILibrary>
          fixed="right"
          title="Actions"
          dataIndex="actions"
          key="actions"
          render={(_, record) => (
            <Dropdown
              overlay={moreMenu(record.id)}
              trigger={["click"]}
            >
              <Icons.MoreOutlined
                onClick={(e) => e.stopPropagation()}
                style={{
                  fontSize: 24,
                }}
              />
            </Dropdown>
          )}
        />
      </Table>
    </Card>
  );
}