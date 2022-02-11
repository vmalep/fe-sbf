import {
  IResourceComponentsProps,
  useExport,
  CrudFilters,
  HttpError,
} from "@pankod/refine-core";

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
  const { tableProps, sorter, searchFormProps } = useTable<
    ILibrary,
    HttpError,
    ILibraryFilterVariables
  >({
    initialSorter: [
      {
        field: "id",
        order: "desc",
      },
    ],
    onSearch: (params) => {
      const filters: CrudFilters = [];
      const { course, school_year } = params;
      console.log("course", course);

      if (course) {
        filters.push({
          field: "course.id",
          operator: "eq",
          value: course,
        });
      }
      if (school_year) {
        filters.push({
          field: "course.school_year.id",
          operator: "eq",
          value: school_year,
        });
      }
      console.log("filters: ", filters);
      return filters;
    },
    metaData: {
      populate: ["course", "course.school_year"],
    },
  });

  // console.log("tableProps: ", tableProps);

  const { selectProps: selectCourseProps } = useSelect<ICourse>({
    resource: "courses",
  });

  const { selectProps: SchoolYearSelectProps } = useSelect<ISchoolYear>({
    resource: "school-years",
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
          {console.log("tableProps", tableProps)}
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
              key="[school_year][id]"
              dataIndex={[
                "course",
                "data",
                "attributes",
                "school_year",
                "data",
                "attributes",
                "title",
              ]}
              title="School year"
              render={(value) => <TextField value={value} />}
              sorter
              filterDropdown={(props) => (
                <FilterDropdown {...props}>
                  <Select
                    allowClear
                    style={{ minWidth: 200 }}
                    mode="multiple"
                    placeholder="Select Courses"
                    {...SchoolYearSelectProps}
                  />
                </FilterDropdown>
              )}
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

            <Table.Column<ILibrary>
              title="Actions"
              dataIndex="actions"
              render={(_, record) => (
                <Space>
                  <ShowButton hideText size="small" recordItemId={record.id} />
                  <EditButton hideText size="small" recordItemId={record.id} />
                  <DeleteButton
                    hideText
                    size="small"
                    recordItemId={record.id}
                  />
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
  /*   const { selectProps: schoolYearSelect } = useSelect<ISchoolYear>({
      resource: "school-years",
      optionLabel: "title",
      optionValue: "id",
    }); */

  const { selectProps: courseSelect } = useSelect<ICourse>({
    resource: "courses",
  });

  return (
    <Form layout="horizontal" {...formProps}>
      <Row>
        {/*       <Col flex="1 0 auto">
          <Form.Item
            label="School year"
            name={["course", "data", "school_year"]}
          >
            <Select
              allowClear
              style={{ minWidth: 200 }}
              mode="multiple"
              placeholder="Select School year"
              {...schoolYearSelect}
            />
          </Form.Item>
        </Col> */}
        <Col flex="1 0 auto">
          <Form.Item label="Course" name="course">
            <Select
              {...courseSelect}
              allowClear
              style={{ minWidth: 200 }}
              placeholder="Select Course"
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
