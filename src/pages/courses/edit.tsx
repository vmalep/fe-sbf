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

import { ICourse, ISchoolYear } from "interfaces";

export const CourseEdit: React.FC<IResourceComponentsProps> = () => {

  const { formProps, saveButtonProps, queryResult } = useForm<ICourse>({
    metaData: {
      populate: ["school_year"],
    },
  });

  const { selectProps } = useSelect<ISchoolYear>({
    resource: "school-years",
    optionLabel: "title",
    optionValue: "id",
  });

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
          label="School year"
          name="school_year"
          rules={[{ required: true }]}
        >
          <Select {...selectProps} />
        </Form.Item>
      </Form>
    </Edit>
  );
};
