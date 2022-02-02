import {
  Create,
  Form,
  Input,
  IResourceComponentsProps,
  useForm,
} from "@pankod/refine";

import "react-mde/lib/styles/css/react-mde-all.css";

import { IBook } from "interfaces";

export const BookCreate: React.FC<IResourceComponentsProps> = () => {

  const { formProps, saveButtonProps } = useForm<IBook>();

  return (
    <Create saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="vertical">
        <Form.Item
          label="Price"
          name="price"
          rules={[{required: true}]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Create>
  );
};
