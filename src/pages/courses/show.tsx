import { useShow, IResourceComponentsProps } from "@pankod/refine-core";

import { Show, Typography } from "@pankod/refine-antd";

import NormalizeData from "helpers/normalizeData";

import { RenderLibraries } from "components/customRenders";

import { ICourse } from "interfaces";

const { Title, Text } = Typography;

export const CourseShow: React.FC<IResourceComponentsProps> = () => {
  const { queryResult } = useShow<ICourse>({
    metaData: {
      populate: [
        "school_year",
        "libraries",
        "libraries.books",
        "libraries.books.users_permissions_user"],
    },
  });
  const { data, isLoading } = queryResult;
  const record = data?.data;
  const school_year = record?.school_year;

  const normalizedRecord = NormalizeData(record);

  return (
    <>
      <Show isLoading={isLoading}>
        <Title level={5}>Id</Title>
        <Text>{record?.id}</Text>
        <Title level={5}>Title</Title>
        <Text>{record?.title}</Text>
        <Title level={5}>School year</Title>
        <Text>{school_year?.title}</Text>
      </Show>
      {RenderLibraries(normalizedRecord?.libraries)}
    </>
  );
};
