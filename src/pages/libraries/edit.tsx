import {
  Edit,
  Form,
  Input,
  IResourceComponentsProps,
  useForm,
  Select,
  useSelect,
} from "@pankod/refine";
import {
  mediaUploadMapper,
} from "@pankod/refine-strapi-v4";

import "react-mde/lib/styles/css/react-mde-all.css";

import { ILibrary, ICourse } from "interfaces";

export const LibraryEdit: React.FC<IResourceComponentsProps> = () => {

  const { formProps, saveButtonProps, queryResult } = useForm<ILibrary>();

  const { selectProps } = useSelect<ICourse>({
    resource: "courses",
    defaultValue: queryResult?.data?.data?.course?.data?.id,
  });

  return (
    <Edit saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="vertical">
        <Form.Item
          label="Title"
          name="title"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Author"
          name="author"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="ISDN"
          name="isdn"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Course"
          name="course"
          rules={[{ required: true }]}
        >
          <Select {...selectProps} />
        </Form.Item>
      </Form>
    </Edit>
  );
};
