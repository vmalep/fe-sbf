import { IResourceComponentsProps } from "@pankod/refine-core";
import { Edit, Form, Input, useForm, Select, useSelect } from "@pankod/refine-antd";
import { mediaUploadMapper } from "@pankod/refine-strapi-v4";

import "react-mde/lib/styles/css/react-mde-all.css";

import { ILibrary, ICourse } from "interfaces";

export const LibraryEdit: React.FC<IResourceComponentsProps> = () => {

  const { formProps, saveButtonProps, queryResult } = useForm<ILibrary>({
    metaData: {
      config: {
        pagination: { pageSize: 500 },
      },
      populate: ["course"],
    },
  });
  console.log(queryResult);

  const { selectProps } = useSelect<ICourse>({
    resource: "courses",
    defaultValue: queryResult?.data?.data?.course?.data?.id,
  });

  return (
    <Edit saveButtonProps={saveButtonProps}>
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
          label="ID"
          name="id"
        >
          <Input disabled={true} />
        </Form.Item>
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
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Course"
          name={["course", "data", "id"]}
          rules={[{ required: true }]}
        >
          <Select {...selectProps} />
        </Form.Item>
      </Form>
    </Edit>
  );
};
