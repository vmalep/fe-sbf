import { useShow, IResourceComponentsProps } from "@pankod/refine-core";

import { Show, Typography } from "@pankod/refine-antd";

import NormalizeData from "helpers/normalizeData";

import { RenderLibraries } from "components/customRenders";

import { ICourse } from "interfaces";

const { Title, Text } = Typography;

export const CourseShow: React.FC<IResourceComponentsProps> = () => {
  const { queryResult } = useShow<ICourse>({
    metaData: {
      populate: "*",
    },
  });
  const { data, isLoading } = queryResult;
  const record = data?.data;
  const school_year = record?.school_year.data?.attributes;

  const libraries = NormalizeData(record?.libraries);

  const renderCourse = () => (
    <Show isLoading={isLoading}>
      <Title level={5}>Id</Title>
      <Text>{record?.id}</Text>
      <Title level={5}>Title</Title>
      <Text>{record?.title}</Text>
      <Title level={5}>School year</Title>
      <Text>{school_year?.title}</Text>
    </Show>
  );

  return (
    <>
      {renderCourse()}
      {RenderLibraries(libraries)}
    </>
  )
};
