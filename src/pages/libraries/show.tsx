import {
  Show,
  useShow,
  Typography,
  IResourceComponentsProps,
} from "@pankod/refine";

import { ILibrary } from "interfaces";

const { Title, Text } = Typography;

export const LibraryShow: React.FC<IResourceComponentsProps> = () => {
  const { queryResult } = useShow<ILibrary>({
    metaData: {
      populate: ["course"],
    },
  });
  const { data, isLoading } = queryResult;
  const record = data?.data;
  const course = record?.course.data?.attributes;

  return (
    <Show isLoading={isLoading}>
      <Title level={5}>Id</Title>
      <Text>{record?.id}</Text>
      <Title level={5}>Title</Title>
      <Text>{record?.title}</Text>
      <Title level={5}>Author</Title>
      <Text>{record?.author}</Text>
      <Title level={5}>ISDN</Title>
      <Text>{record?.isdn}</Text>
      <Title level={5}>Course</Title>
      <Text>{course?.title}</Text>
    </Show>
  );
};
