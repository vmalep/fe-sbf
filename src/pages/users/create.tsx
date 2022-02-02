import {
  Create,
  Form,
  Input,
  IResourceComponentsProps,
  useForm,
} from "@pankod/refine";

import "react-mde/lib/styles/css/react-mde-all.css";

import { IUser } from "interfaces";

export const UserCreate: React.FC<IResourceComponentsProps> = () => {

  const { formProps, saveButtonProps } = useForm<IUser>();

  return (
    <Create saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="vertical">
        <Form.Item
          label="Username"
          name="username"
          rules={[{required: true}]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Email"
          name="email"
          rules={[{required: true}]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Create>
  );
};
