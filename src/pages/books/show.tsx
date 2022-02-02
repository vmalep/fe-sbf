import {
  Show,
  useShow,
  Typography,
  IResourceComponentsProps,
} from "@pankod/refine";

import { IBook } from "interfaces";

const { Title, Text } = Typography;

export const BookShow: React.FC<IResourceComponentsProps> = () => {
  const { queryResult } = useShow<IBook>({
    metaData: {
      populate: "*",
    },
  });
  const { data, isLoading } = queryResult;
  const record = data?.data;
  console.log(record);
  const library = record?.library.data?.attributes;
  const user = record?.users_permissions_user.data?.attributes;

  return (
    <Show isLoading={isLoading}>
      <Title level={5}>Id</Title>
      <Text>{record?.id}</Text>
      <Title level={5}>Title</Title>
      <Text>{library?.title}</Text>
      <Title level={5}>Owner</Title>
      <Text>{user?.username}</Text>
      <Title level={5}>Price</Title>
      <Text>{record?.price}</Text>
    </Show>
  );
};
