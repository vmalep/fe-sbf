import { IResourceComponentsProps } from "@pankod/refine-core";
import { Create, Form, Input, useForm, Select, useSelect } from "@pankod/refine-antd";
import { mediaUploadMapper } from "@pankod/refine-strapi-v4";

import "react-mde/lib/styles/css/react-mde-all.css";

import { ICourse, ISchoolYear } from "interfaces";

export const CourseCreate: React.FC<IResourceComponentsProps> = () => {

  const { formProps, saveButtonProps } = useForm<ICourse>({
    metaData: {
      populate: ["school_year"],
    },
  });
  console.log(formProps);

  const { selectProps } = useSelect<ISchoolYear>({
    resource: "school-years",
  });

  return (
    <Create saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="vertical"
        onFinish={(values: any) => {
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
    </Create>
  );
};
