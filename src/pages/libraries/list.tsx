import { IResourceComponentsProps, useExport, CrudFilters, HttpError } from "@pankod/refine-core";

import {
  List,
  Table,
  TextField,
  useTable,
  getDefaultSortOrder,
  Space,
  EditButton,
  DeleteButton,
  ShowButton,
  Select,
  useSelect,
  FilterDropdown,
  Form,
  Button,
  Card,
  FormProps,
  Row,
  Col,
  useImport,
  ImportButton,
  ExportButton,
  CreateButton,
} from "@pankod/refine-antd";

import {
  ILibrary,
  ICourse,
  ISchoolYear,
  ILibraryFilterVariables,

} from "interfaces";

export const LibraryList: React.FC<IResourceComponentsProps> = () => {
  const { tableProps, sorter, searchFormProps } = useTable<ILibrary, HttpError, ILibraryFilterVariables>({
    initialSorter: [
      {
        field: "id",
        order: "desc",
      },
    ],
    onSearch: (params) => {
      const filters: CrudFilters = [];
      const { course, school_year } = params;

      filters.push(
        {
          field: "course",
          operator: "eq",
          value: course,
        },
        {
          field: "course.data.attributes.school_year",
          operator: "eq",
          value: school_year,
        },
      );

      return filters;
    },
    metaData: {
      populate: [
        'course',
        'course.school_year',
      ],
    },
  });

  console.log(tableProps);

  const { selectProps: selectCourseProps } = useSelect<ICourse>({
    resource: "courses",
    optionLabel: "title",
    optionValue: "id",
  });

  const { selectProps: selectSchoolYearProps } = useSelect<ISchoolYear>({
    resource: "school-years",
    optionLabel: "title",
    optionValue: "id",
  });

  const importProps = useImport<ILibrary>();
  const { triggerExport, isLoading } = useExport<ILibrary>();

  return (
    <>
      <Card>
        <Filter formProps={searchFormProps} />
      </Card>
      <Card>
        <List
          pageHeaderProps={{
            extra: (
              <>
                <ImportButton {...importProps} />
                <ExportButton onClick={triggerExport} loading={isLoading} />
                <CreateButton />
              </>
            ),
          }}
        >
          <Table
            {...tableProps}
            rowKey="id"
            pagination={{
              ...tableProps.pagination,
              pageSize: 20,
            }}
          >
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
              filterDropdown={(props) => (
                <FilterDropdown {...props}>
                  <Select
                    style={{ minWidth: 200 }}
                    placeholder="Select Course"
                    {...selectCourseProps}
                  />
                </FilterDropdown>
              )}
            />
            <Table.Column
              key="[school_year][id]"
              dataIndex={["course", "data", "attributes", "school_year", "data", "attributes", "title"]}
              title="School year"
              render={(value) => <TextField value={value} />}
              sorter
              filterDropdown={(props) => (
                <FilterDropdown {...props}>
                  <Select
                    placeholder="Select School year"
                    {...selectSchoolYearProps}
                  />
                </FilterDropdown>
              )}
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
      </Card>
    </>
  );
};

const Filter: React.FC<{ formProps: FormProps }> = ({ formProps }) => {

  const { selectProps: schoolYearSelect } = useSelect<ISchoolYear>({
    resource: "school-years",
    optionLabel: "title",
    optionValue: "id",
  });

  const { selectProps: courseSelect } = useSelect<ICourse>({
    resource: "courses",
    optionLabel: "title",
    optionValue: "id",
  });

  return (
    <Form layout="horizontal" {...formProps}>
      <Row>
      <Col flex="1 0 auto">
          <Form.Item
            label="School year"
            name={["course", "data", "school_year", "data", "id"]}
          >
            <Select
              allowClear
              style={{ minWidth: 200 }}
              mode="multiple"
              placeholder="Select Courses"
              {...schoolYearSelect}
            />
          </Form.Item>
        </Col>
        <Col flex="1 0 auto">
          <Form.Item
            label="Course"
            name={["course", "data", "id"]}
          >
            <Select
              allowClear
              style={{ minWidth: 200 }}
              mode="multiple"
              placeholder="Select Courses"
              {...courseSelect}
            />
          </Form.Item>
        </Col>
        <Col flex="1 0 auto">
          <Form.Item>
            <Button htmlType="submit" type="primary">
              Filter
            </Button>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};
