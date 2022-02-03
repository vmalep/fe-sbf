import {
  Create,
  Form,
  Input,
  IResourceComponentsProps,
  useForm,
} from "@pankod/refine";

import "react-mde/lib/styles/css/react-mde-all.css";

import { ISchoolYear } from "interfaces";

export const SchoolYearCreate: React.FC<IResourceComponentsProps> = () => {

  const { formProps, saveButtonProps } = useForm<ISchoolYear>();

  return (
    <Create saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="vertical">
        <Form.Item
          label="Title"
          name="title"
          rules={[{required: true}]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Create>
  );
};
