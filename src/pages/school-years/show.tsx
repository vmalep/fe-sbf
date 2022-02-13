import { useShow, IResourceComponentsProps } from "@pankod/refine-core";

import { Show, Typography } from "@pankod/refine-antd";

import { RenderCourses } from "components/customRenders"

import { ISchoolYear } from "interfaces";

const { Title, Text } = Typography;

export const SchoolYearShow: React.FC<IResourceComponentsProps> = () => {
  const { queryResult } = useShow<ISchoolYear>({
    metaData: {
      populate: ["courses", "courses.libraries"],
    }
  });
  const { data, isLoading } = queryResult;
  const record = data?.data;

  console.log('record: ', record);

  //const renderSchoolYear = () => (
  return (
    <>
      <Show isLoading={isLoading}>
        <Title level={5}>Id</Title>
        <Text>{record?.id}</Text>
        <Title level={5}>Title</Title>
        <Text>{record?.title}</Text>
      </Show>
      {RenderCourses(record?.courses)}
    </>
  );
};
