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
  useStrapiUpload,
  getValueProps,
  mediaUploadMapper,
} from "@pankod/refine-strapi-v4";

import "react-mde/lib/styles/css/react-mde-all.css";

//import { /* TOKEN_KEY, */ API_URL } from "../../constants";
import { ICourse, ILibrary } from "interfaces";

export const CourseEdit: React.FC<IResourceComponentsProps> = () => {

  const { formProps, saveButtonProps, queryResult } = useForm<ICourse>({
    metaData: { populate: ["libraries"] },
  });

  const { selectProps } = useSelect<ILibrary>({
    resource: "libraries",
    defaultValue: queryResult?.data?.data?.libraries?.data?.id,
    //metaData: { locale: queryResult?.data?.data.locale },
  });

  return (
    <Edit saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="vertical"
        onFinish={(values: any) => {
          return (
            formProps.onFinish &&
            formProps.onFinish(
              mediaUploadMapper({
                ...values,
                libraries: values.libraries?.data.id,
              }),
            )
          );
        }}
      >
        <Form.Item
          label="Id"
          name="id"
        >
          <Input disabled={true} />
        </Form.Item>
        <Form.Item
          label="Title"
          name="title"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          wrapperCol={{ span: 8 }}
          label="Libraries"
          name={["libraries", "data", "id"]}
          rules={[{ required: true }]}
        >
          <Select {...selectProps} />
        </Form.Item>
      </Form>
    </Edit>
  );
};
