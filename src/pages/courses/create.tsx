import {
  Create,
  Form,
  Input,
  IResourceComponentsProps,
  useForm,
} from "@pankod/refine";

import "react-mde/lib/styles/css/react-mde-all.css";

import { ICourse } from "interfaces";

export const CourseCreate: React.FC<IResourceComponentsProps> = () => {

  const { formProps, saveButtonProps } = useForm<ICourse>();

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
