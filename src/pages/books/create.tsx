import React, { useState } from "react";
import { IResourceComponentsProps, useList } from "@pankod/refine-core";
import { Create, Form, Input, Radio, useForm, Select, useSelect } from "@pankod/refine-antd";
import { mediaUploadMapper } from "@pankod/refine-strapi-v4";

import ReactMarkdown from "react-markdown";
import ReactMde from "react-mde";

import "react-mde/lib/styles/css/react-mde-all.css";

import { IBook, ILibrary, ICourse, ISchoolYear, IUser } from "interfaces";

export const BookCreate: React.FC<IResourceComponentsProps> = () => {

  const { formProps, saveButtonProps, queryResult } = useForm<IBook>({
    metaData: {
      populate: "*",
    },
  });

  const { selectProps: selectUserProps } = useSelect<IUser>({
    resource: "users",
/*     defaultValue: queryResult?.data?.data?.users_permissions_user?.data?.id,
    optionLabel: "username",
    optionValue: "id", */
  });

  const schoolYearSelect = useList<ISchoolYear>({
    resource: "school-years",
    config: {
      pagination: { pageSize: 500 },
    },
  });

  const courseSelect = useList<ICourse>({
    resource: "courses",
    config: {
      pagination: { pageSize: 500 },
    },
  });

  const librarySelect = useList<ILibrary>({
    resource: "libraries",
    config: {
      pagination: { pageSize: 500 },
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
                users_permissions_user: values.users_permissions_user?.data.id,
              }),
            )
          );
        }}
      >
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
          label="School year"
          name={["school_year", "data", "id"]}
          rules={[{ required: true }]}
        >
          <Select
            defaultValue={queryResult?.data?.data?.school_year?.data?.id}
          >
            {(schoolYearSelect?.data?.data || []).map(
              (school_year: ISchoolYear) => {
                return (
                  <Option key={school_year.id}>
                    {school_year.title}
                  </Option>
                );
              }
            )}
          </Select>
        </Form.Item>
        <Form.Item
          label="Course"
          name={["course", "data", "id"]}
          rules={[{ required: true }]}
        >
          <Select
            defaultValue={queryResult?.data?.data?.course?.data?.id}
          >
            {(courseSelect?.data?.data || []).map(
              (course: ICourse) => {
                return (
                  <Option key={course.id}>
                    {course.title}
                  </Option>
                );
              }
            )}
          </Select>
        </Form.Item>
        <Form.Item
          label="Title"
          name={["library", "data", "id"]}
          rules={[{ required: true }]}
        >
          <Select
            defaultValue={
              queryResult?.data?.data?.library?.data?.id
            }
          >
            {(librarySelect?.data?.data || []).map(
              (library: ILibrary) => {
                //console.log('library: ', library);
                return (
                  <Option key={library.id}>
                    {library.title}{/*  - {library.course.data.attributes.title} - {library.course.data.attributes.school_year.data.attributes.title} */}
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
        <Form.Item
          label="Owner"
          name={["users_permissions_user", "data", "id"]}
          rules={[{ required: true }]}
        >
          <Select {...selectUserProps} />
        </Form.Item>
      </Form>
    </Create>
  );
};
