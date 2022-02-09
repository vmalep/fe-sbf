import React, { useState } from "react";
import { IResourceComponentsProps, useList } from "@pankod/refine-core";

import { Edit, Form, Input, useForm, Select, useSelect } from "@pankod/refine-antd";

import ReactMarkdown from "react-markdown";
import ReactMde from "react-mde";

import "react-mde/lib/styles/css/react-mde-all.css";

import { IReservation, IBook, IUser } from "interfaces";

export const ReservationEdit: React.FC<IResourceComponentsProps> = () => {

  const { formProps, saveButtonProps, queryResult } = useForm<IReservation>();

  const { selectProps: selectUserProps } = useSelect<IUser>({
    resource: "users",
    defaultValue: queryResult?.data?.data?.users_permissions_user?.data?.id,
    optionLabel: "username",
    optionValue: "id",
  });

  const bookSelect = useList<IBook>({
    resource: "books",
    //defaultValue: queryResult?.data?.data?.library?.data?.id,
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
      <Form {...formProps} layout="vertical">
      <Form.Item label="ID" name="id">
          <Input disabled={true} />
        </Form.Item>
      <Form.Item
          label="Title"
          name={["library", "data", "id"]}
          rules={[{ required: true }]}
        >
          <Select
            defaultValue={
              queryResult?.data?.data?.book?.data?.id
            }
          >
            {(bookSelect?.data?.data || []).map(
              (book: IBook) => {
                //console.log('book: ', book);
                return (
                  <Option key={book.id}>
                    {book.library.data.attributes.title}
                  </Option>
                );
              }
            )}
          </Select>
        </Form.Item>
        <Form.Item
          label="Owner"
          name={["users_permissions_user", "data", "id"]}
          rules={[{ required: true }]}
        >
          <Select {...selectUserProps} />
        </Form.Item>
        <Form.Item
          label="Title"
          name="title"
          rules={[{required: true}]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Status"
          name="status"
          rules={[{ required: true }]}
          >
          <Select
            defaultValue="proposed"
            options={[
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
