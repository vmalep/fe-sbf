import {
  Show,
  useShow,
  Typography,
  IResourceComponentsProps,
} from "@pankod/refine";

import { ICourse } from "interfaces";

const { Title, Text } = Typography;

export const CourseShow: React.FC<IResourceComponentsProps> = () => {
  const { queryResult } = useShow<ICourse>();
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
