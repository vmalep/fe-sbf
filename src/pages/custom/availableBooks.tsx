import { useShow, IResourceComponentsProps } from "@pankod/refine-core";

import { Show, Typography } from "@pankod/refine-antd";

import NormalizeData from "helpers/normalizeData";

import { RenderCourses } from "components/customRenders";

import { ISchoolYear } from "interfaces";

const { Title, Text } = Typography;

export const SchoolYearShow: React.FC<IResourceComponentsProps> = () => {
  const { queryResult } = useShow<ISchoolYear>({
    metaData: {
      populate: [
        "courses",
        "courses.libraries",
        "courses.libraries.books"
    }
  });
  const { data, isLoading } = queryResult;
  const record = data?.data;

  const normalizedRecord = NormalizeData(record);

  return (
    <>
      <Show isLoading={isLoading}>
        <Title level={5}>Id</Title>
        <Text>{record?.id}</Text>
        <Title level={5}>Title</Title>
        <Text>{record?.title}</Text>
      </Show>
      {RenderCourses(normalizedRecord?.courses)}
    </>
  );
};
