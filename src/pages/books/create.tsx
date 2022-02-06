import React, { useState } from "react";
import {
  Create,
  Form,
  Input,
  IResourceComponentsProps,
  useForm,
  Select,
  useSelect,
} from "@pankod/refine";
import { mediaUploadMapper } from "@pankod/refine-strapi-v4";

import ReactMarkdown from "react-markdown";
import ReactMde from "react-mde";

import "react-mde/lib/styles/css/react-mde-all.css";

import { IBook, ILibrary, IUser } from "interfaces";

export const BookCreate: React.FC<IResourceComponentsProps> = () => {

  const { formProps, saveButtonProps, queryResult } = useForm<IBook>({
    metaData: {
      populate: "*",
    },
  });

  const { selectProps: selectParentProps } = useSelect<IUser>({
    resource: "users",
    defaultValue: queryResult?.data?.data?.users_permissions_user?.data?.id,
    optionLabel: "username",
    optionValue: "id",
  });

  const { selectProps: selectLibraryProps } = useSelect<ILibrary>({
    resource: "libraries",
    defaultValue: queryResult?.data?.data?.library?.data?.id,
  });

  const [selectedTab, setSelectedTab] = useState<"write" | "preview">("write");

  return (
    <Create saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="vertical"
        onFinish={(values: any) => {
          return (
            formProps.onFinish &&
            formProps.onFinish(
              mediaUploadMapper({
                ...values,
                users_permissions_user: values.users_permissions_user?.data.id,
                library: values.library?.data.id,
              }),
            )
          );
        }}
      >
        <Form.Item
          label="Owner"
          name={["users_permissions_user", "data", "id"]}
          rules={[{ required: true }]}
        >
          <Select {...selectParentProps} />
        </Form.Item>
        <Form.Item
          label="Title"
          name={["library", "data", "id"]}
          rules={[{ required: true }]}
        >
          <Select {...selectLibraryProps} />
        </Form.Item>
        <Form.Item
          label="Status"
          name="status"
          rules={[{ required: true }]}
        >
          <Select
            options={[
              {label: "As new", value: "asNew"},
              {label: "Fine", value: "fine"},
              {label: "Very good", value: "veryGood"},
              {label: "Good", value: "good"},
              {label: "Fair", value: "fair"},
              {label: "Poor", value: "poor"},
              {label: "Binding copy", value: "bindingCopy"},
            ]}
          />
        </Form.Item>
        <Form.Item
          label="Comment"
          name="comment"
        >
          <ReactMde
            selectedTab={selectedTab}
            onTabChange={setSelectedTab}
            generateMarkdownPreview={(markdown) =>
              Promise.resolve(
                <ReactMarkdown>{markdown}</ReactMarkdown>,
              )
            }
          />
        </Form.Item>
        <Form.Item
          label="Price"
          name="price"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Create>
  );
};
