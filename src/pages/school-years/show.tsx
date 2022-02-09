import { useShow, IResourceComponentsProps } from "@pankod/refine-core";

import { Show, Typography } from "@pankod/refine-antd";

import { ISchoolYear } from "interfaces";

const { Title, Text } = Typography;

export const SchoolYearShow: React.FC<IResourceComponentsProps> = () => {
  const { queryResult } = useShow<ISchoolYear>();
  const { data, isLoading } = queryResult;
  const record = data?.data;

  return (
    <Show isLoading={isLoading}>
      <Title level={5}>Id</Title>
      <Text>{record?.id}</Text>
      <Title level={5}>Title</Title>
      <Text>{record?.title}</Text>
    </Show>
  );
};
