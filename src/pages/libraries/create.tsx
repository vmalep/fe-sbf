import {
  Create,
  Form,
  Input,
  IResourceComponentsProps,
  useForm,
  Select,
  useSelect,
} from "@pankod/refine";

import "react-mde/lib/styles/css/react-mde-all.css";

import { ILibrary, ICourse } from "interfaces";

export const LibraryCreate: React.FC<IResourceComponentsProps> = () => {

  const { formProps, saveButtonProps, queryResult } = useForm<ILibrary>({
    metaData: {
      populate: ["course"],
    },
  });

  const { selectProps } = useSelect<ICourse>({
    resource: "courses",
    optionValue: queryResult?.data?.data?.course?.data?.id,
  });

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
        <Form.Item
          label="Author"
          name="author"
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="ISDN"
          name="isdn"
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
    </Create>
  );
};
