import React, { useState } from "react";
import { IResourceComponentsProps } from "@pankod/refine-core";
import { Edit, Form, Input, Radio, useForm, Select, useSelect } from "@pankod/refine-antd";
import { mediaUploadMapper } from "@pankod/refine-strapi-v4";

import ReactMarkdown from "react-markdown";
import ReactMde from "react-mde";

import "react-mde/lib/styles/css/react-mde-all.css";

import { IBook, ILibrary, IUser } from "interfaces";

export const BookEdit: React.FC<IResourceComponentsProps> = () => {

  const { formProps, saveButtonProps, queryResult } = useForm<IBook>({
    metaData: {
      populate: "*",
    },
  });

  const { selectProps: selectParentProps } = useSelect<IUser>({
    resource: "users",
    defaultValue: queryResult?.data?.data?.users_permissions_user?.data?.id,
    optionLabel: "username",
  });

  const { selectProps: selectLibraryProps } = useSelect<ILibrary>({
    resource: "libraries",
    defaultValue: queryResult?.data?.data?.library?.data?.id,
  });

  const [selectedTab, setSelectedTab] = useState<"write" | "preview">("write");

  return (
    <Edit saveButtonProps={saveButtonProps}>
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
        <Form.Item label="ID" name="id">
          <Input disabled={true} />
        </Form.Item>
        <Form.Item
          label="Available"
          name="is_available"
        >
          <Radio.Group>
            <Radio value={true}>True</Radio>
            <Radio value={false}>False</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item
          label="Title"
          name={["library", "data", "attributes", "title"]}
        /* rules={[{ required: true }]} */
        >
          <Input disabled={true} />
        </Form.Item>
        <Form.Item
          label="State"
          name="state"
          rules={[{ required: true }]}
        >
          <Select
            options={[
              { label: "As new", value: "asNew" },
              { label: "Fine", value: "fine" },
              { label: "Very good", value: "veryGood" },
              { label: "Good", value: "good" },
              { label: "Fair", value: "fair" },
              { label: "Poor", value: "poor" },
              { label: "Binding copy", value: "bindingCopy" },
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
        <Form.Item
          label="Owner"
          name={["users_permissions_user", "data", "id"]}
          rules={[{ required: true }]}
        >
          <Select {...selectParentProps} />
        </Form.Item>
      </Form>
    </Edit>
  );
};
