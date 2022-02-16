import { IResourceComponentsProps } from "@pankod/refine-core";
import { Edit, Form, Input, useForm, Select, useSelect } from "@pankod/refine-antd";
import { mediaUploadMapper } from "@pankod/refine-strapi-v4";

import "react-mde/lib/styles/css/react-mde-all.css";

import { ICourse, ISchoolYear } from "interfaces";

export const CourseEdit: React.FC<IResourceComponentsProps> = () => {

  const { formProps, saveButtonProps } = useForm<ICourse>({
    metaData: {
      populate: ["school_year"],
    },
  });

  const { selectProps } = useSelect<ISchoolYear>({
    resource: "school-years",
  });

  return (
    <Edit saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="vertical"
        onFinish={(values: any) => {
          console.log('onFinish: ', values.school_year?.data.id);
          return (
            formProps.onFinish &&
            formProps.onFinish(
              mediaUploadMapper({
                ...values,
                school_year: values.school_year?.data.id,
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
          label="School year"
          name={["school_year", "data", "id"]}
          rules={[{ required: true }]}
        >
          <Select {...selectProps} />
        </Form.Item>
      </Form>
    </Edit>
  );
};
