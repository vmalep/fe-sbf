import {
  Edit,
  Form,
  Input,
  IResourceComponentsProps,
  useForm,
} from "@pankod/refine";

import "react-mde/lib/styles/css/react-mde-all.css";

import { ILibrary } from "interfaces";

export const LibraryEdit: React.FC<IResourceComponentsProps> = () => {

  const { formProps, saveButtonProps } = useForm<ILibrary>();

  return (
    <Edit saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="vertical">
        <Form.Item
          label="Title"
          name="title"
          rules={[{required: true}]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Author"
          name="author"
          rules={[{required: true}]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="ISDN"
          name="isdn"
          rules={[{required: true}]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Edit>
  );
};
