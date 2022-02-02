import {
  Edit,
  Form,
  Input,
  IResourceComponentsProps,
  useForm,
} from "@pankod/refine";

import "react-mde/lib/styles/css/react-mde-all.css";

import { IUser } from "interfaces";

export const UserEdit: React.FC<IResourceComponentsProps> = () => {

  const { formProps, saveButtonProps } = useForm<IUser>();

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
    </Edit>
  );
};
