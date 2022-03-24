import React, { useState } from "react";
import { IResourceComponentsProps, useList } from "@pankod/refine-core";

import { Edit, Form, Input, useForm, Select, useSelect } from "@pankod/refine-antd";
import { mediaUploadMapper } from "@pankod/refine-strapi-v4";

import ReactMarkdown from "react-markdown";
import ReactMde from "react-mde";

import "react-mde/lib/styles/css/react-mde-all.css";

import { IReservation, IBook, IUser } from "interfaces";

export const ReservationEdit: React.FC<IResourceComponentsProps> = () => {

  const { formProps, saveButtonProps, queryResult } = useForm<IReservation>({
    metaData: {
      populate: [
        "book",
        "book.library",
        "users_permissions_user",
      ],
    },
  });

  console.log('edit res query res: ', queryResult);

  const { selectProps: selectUserProps } = useSelect<IUser>({
    resource: "users",
    defaultValue: queryResult?.data?.data?.users_permissions_user?.id,
    optionLabel: "username",
    optionValue: "id",
  });

  const bookSelect = useList<IBook>({
    resource: "books",
    config: {
      pagination: { pageSize: 500 },
    },
    metaData: {
      populate: ["library"],
    },
  });

  const { Option } = Select;

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
                book: values.book?.data.id,
                users_permissions_user: values.users_permissions_user?.id,
              }),
            )
          );
        }}
      >
        <Form.Item label="ID" name="id">
          <Input disabled={true} />
        </Form.Item>
        <Form.Item
          label="Book"
          name={["book", "data", "id"]}
          rules={[{ required: true }]}
        >
          <Select>
            defaultValue={["book?.data?.attributes.library.data.attributes.title"]},
            {(bookSelect?.data?.data || []).map(
              (book: IBook) => {
                return (
                  <Option key={book.id}>
                    {book.library.title}
                  </Option>
                );
              }
            )}
          </Select>
        </Form.Item>
        <Form.Item
          label="User"
          name={["users_permissions_user", "data", "id"]}
          rules={[{ required: true }]}
        >
          <Select {...selectUserProps} />
        </Form.Item>
        <Form.Item
          label="Status"
          name="status"
        >
          <Select
            defaultValue="interested"
            options={[
              { label: "Interested", value: "interested" },
              { label: "Proposed", value: "proposed" },
              { label: "Confirmed", value: "confirmed" },
              { label: "Rejected", value: "rejected" },
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
      </Form>
    </Edit>
  );
};