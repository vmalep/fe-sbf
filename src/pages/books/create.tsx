import React, { useState } from "react";
import { IResourceComponentsProps, useList, useGetIdentity } from "@pankod/refine-core";
import { Create, Form, Input, Radio, useForm, Select, useSelect } from "@pankod/refine-antd";
import { mediaUploadMapper } from "@pankod/refine-strapi-v4";

import ReactMarkdown from "react-markdown";
import ReactMde from "react-mde";

import "react-mde/lib/styles/css/react-mde-all.css";

import { IBook, ILibrary, IUser } from "interfaces";

export const BookCreate: React.FC<IResourceComponentsProps> = () => {
  const { data: user } = useGetIdentity();
  const { formProps, saveButtonProps } = useForm<IBook>({
    metaData: {
      populate: "*",
    },
  });

  const { selectProps: selectUserProps } = useSelect<IUser>({
    resource: "users",
    optionLabel: "username",
  });

  const librarySelect = useList<ILibrary>({
    resource: "libraries",
    config: {
      pagination: { pageSize: 500 },
    },
    metaData: {
      populate: [
        "course",
        "course.school_year",
      ]
    },
  });

  const { Option } = Select;

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
                library: values.library?.data.id,
                users_permissions_user: values.users_permissions_user?.data.id ? values.users_permissions_user?.data.id : user.id,
              }),
            )
          );
        }}
      >
        <Form.Item
          label="Available"
          name="is_available"
        >
          <Radio.Group defaultValue={true}>
            <Radio value={true}>True</Radio>
            <Radio value={false}>False</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item
          label="Title"
          name={["library", "data", "id"]}
          rules={[{ required: true }]}
        >
          <Select>
            {(librarySelect?.data?.data || []).map(
              (library: ILibrary) => {
                return (
                  <Option key={library.id}>
                    {library.title} - {library.course.title} - {library.course.school_year.title}
                  </Option>
                );
              }
            )}
          </Select>
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
        {user?.role === "admin" && (
          <Form.Item
            label="Owner"
            name={["users_permissions_user", "data", "id"]}
          >
            <Select {...selectUserProps} />
          </Form.Item>
        )}
      </Form>
    </Create>
  );
};
