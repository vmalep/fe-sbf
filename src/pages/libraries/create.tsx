import {
IResourceComponentsProps, //useSelect,
useList
} from "@pankod/refine-core";
import { Create, Form, Input, useForm, Select } from "@pankod/refine-antd";
import { mediaUploadMapper } from "@pankod/refine-strapi-v4";

import "react-mde/lib/styles/css/react-mde-all.css";

import { ILibrary, ICourse } from "interfaces";

export const LibraryCreate: React.FC<IResourceComponentsProps> = () => {

  const { formProps, saveButtonProps, queryResult } = useForm<ILibrary>({
    metaData: {
      populate: ["course"],
    },
  });
  console.log(queryResult);

  const courseSelect = useList<ICourse>({
    resource: "courses",
    config: {
      pagination: { pageSize: 500 },
    },
    metaData: {
      populate: ["school_year"],
    },
  });

  const { Option } = Select;

  return (
    <Create saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="vertical"
        onFinish={(values: any) => {
          return (
            formProps.onFinish &&
            formProps.onFinish(
              mediaUploadMapper({
                ...values,
                course: values.course?.data.id,
              }),
            )
          );
        }}
      >
        <Form.Item
          label="Title"
          name="title"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Author"
          name="author"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="ISDN"
          name="isdn"
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Course"
          name={["course", "data", "id"]}
          rules={[{ required: true }]}
        >
          <Select
            defaultValue={
              queryResult?.data?.data?.course?.id
            }
          >
            {(courseSelect?.data?.data || []).map(
              (course: ICourse) => {
                return (
                  <Option key={course.id}>
                    {course.title} - {course.school_year.title}
                  </Option>
                );
              }
            )}
          </Select>
        </Form.Item>
      </Form>
    </Create>
  );
};
