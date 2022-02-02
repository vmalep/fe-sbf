import {
  List,
  Table,
  TextField,
  useTable,
  IResourceComponentsProps,
  getDefaultSortOrder,
  Space,
  EditButton,
  DeleteButton,
  ShowButton,
} from "@pankod/refine";
import { ILibrary } from "interfaces";

export const LibraryList: React.FC<IResourceComponentsProps> = () => {
  const { tableProps, sorter } = useTable<ILibrary>({
    initialSorter: [
      {
        field: "id",
        order: "desc",
      },
    ],
    metaData: {
      populate: ["course"],
    },
  });

  //const course = record?.course.data?.attributes;

  return (
    <List>
      <Table {...tableProps} rowKey="id">
        <Table.Column
          dataIndex="id"
          key="id"
          title="ID"
          render={(value) => <TextField value={value} />}
          defaultSortOrder={getDefaultSortOrder("id", sorter)}
          sorter
        />
        <Table.Column
          dataIndex="title"
          key="title"
          title="Title"
          render={(value) => <TextField value={value} />}
          defaultSortOrder={getDefaultSortOrder("title", sorter)}
          sorter
        />
        <Table.Column
          dataIndex="author"
          key="author"
          title="Author"
          render={(value) => <TextField value={value} />}
          defaultSortOrder={getDefaultSortOrder("author", sorter)}
          sorter
        />
        <Table.Column
          key="[course][id]"
          dataIndex={["course", "data", "attributes", "title"]}
          title="Course"
          render={(value) => <TextField value={value} />}
          sorter
        />
        <Table.Column<ILibrary>
          title="Actions"
          dataIndex="actions"
          render={(_, record) => (
            <Space>
              <ShowButton hideText size="small" recordItemId={record.id} />
              <EditButton hideText size="small" recordItemId={record.id} />
              <DeleteButton hideText size="small" recordItemId={record.id} />
            </Space>
          )}
        />
      </Table>
    </List>
  );
};
