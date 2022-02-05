import {
  Create,
  Form,
  Input,
  IResourceComponentsProps,
  useForm,
  Select,
  useSelect,
  useList,
} from "@pankod/refine";
import { mediaUploadMapper } from "@pankod/refine-strapi-v4";

import "react-mde/lib/styles/css/react-mde-all.css";

import { ILibrary, ICourse } from "interfaces";

export const LibraryCreate: React.FC<IResourceComponentsProps> = () => {

  const { formProps, saveButtonProps, queryResult } = useForm<ILibrary>({
    metaData: {
      populate: ["course", "course.school_year"],
    },
  });
  console.log(queryResult);

/*   const { selectProps } = useSelect<ICourse>({ // Todo: display the title of the course concatenated with the school-year
    resource: "courses",
    defaultValue: queryResult?.data?.data?.course?.data?.id,
  }); */

  const courseSelect = useList<ICourse>({
    resource: "courses",
    metaData: {
      populate: ["school_year"],
    },
  });

  const { Option } = Select;

  return (
    <Create saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="vertical"
        onFinish={(values: any) => {
          return (
            formProps.onFinish &&
            formProps.onFinish(
              mediaUploadMapper({
                ...values,
                course: values.course?.data.id,
              }),
            )
          );
        }}
      >
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
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Course"
          name={["course", "data", "id"]}
          rules={[{ required: true }]}
        >
          {/* <Select {...selectProps} /> */}
          <Select
            defaultValue={
              queryResult?.data?.data?.course?.data?.id
            }
          >
            {(courseSelect?.data?.data || []).map(
              (course: ICourse) => {
                console.log('course: ', course);
                return (
                  <Option key={course.id}>
                    {course.title} - {course.school_year.data.attributes.title}
                  </Option>
                );
              }
            )}
          </Select>
        </Form.Item>
      </Form>
    </Create>
  );
};
