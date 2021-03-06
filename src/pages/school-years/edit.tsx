import { IResourceComponentsProps } from "@pankod/refine-core";

import { Edit, Form, Input, useForm } from "@pankod/refine-antd";

import "react-mde/lib/styles/css/react-mde-all.css";

import { ISchoolYear } from "interfaces";

export const SchoolYearEdit: React.FC<IResourceComponentsProps> = () => {

  const { formProps, saveButtonProps } = useForm<ISchoolYear>();

  return (
    <Edit saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="vertical">
        <Form.Item
          label="Id"
          name="id"
        >
          <Input disabled={true} />
        </Form.Item>
        <Form.Item
          label="Title"
          name="title"
          rules={[{required: true}]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Edit>
  );
};
