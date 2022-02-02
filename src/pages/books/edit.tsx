import {
  Edit,
  Form,
  Input,
  IResourceComponentsProps,
  useForm,
} from "@pankod/refine";

import "react-mde/lib/styles/css/react-mde-all.css";

import { IBook } from "interfaces";

export const BookEdit: React.FC<IResourceComponentsProps> = () => {

  const { formProps, saveButtonProps } = useForm<IBook>();

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
          label="Price"
          name="price"
          rules={[{required: true}]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Edit>
  );
};
