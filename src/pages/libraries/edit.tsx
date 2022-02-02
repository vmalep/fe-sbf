import {
  Edit,
  Form,
  Input,
  IResourceComponentsProps,
  useForm,
  Select,
  useSelect,
} from "@pankod/refine";

import "react-mde/lib/styles/css/react-mde-all.css";

import { ILibrary, ICourse } from "interfaces";

export const LibraryEdit: React.FC<IResourceComponentsProps> = () => {

  const { formProps, saveButtonProps, queryResult } = useForm<ILibrary>({
    metaData: {
      populate: ["course"],
    },
  });
  const course = queryResult?.data?.data?.course;
  console.log(course);
  
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
          name={["course", "data", "attributes", "title"]}
          rules={[{ required: true }]}
        >
          <Select {...selectProps} />
        </Form.Item>
      </Form>
    </Edit>
  );
};
