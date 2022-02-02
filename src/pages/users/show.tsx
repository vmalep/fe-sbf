import {
  Show,
  useShow,
  Typography,
  IResourceComponentsProps,
} from "@pankod/refine";

import { IUser } from "interfaces";

const { Title, Text } = Typography;

export const UserShow: React.FC<IResourceComponentsProps> = () => {
  const { queryResult } = useShow<IUser>();
  const { data, isLoading } = queryResult;
  const record = data?.data;

  return (
    <Show isLoading={isLoading}>
      <Title level={5}>Id</Title>
      <Text>{record?.id}</Text>
      <Title level={5}>Username</Title>
      <Text>{record?.username}</Text>
      <Title level={5}>Firstname</Title>
      <Text>{record?.firstname}</Text>
      <Title level={5}>Lastname</Title>
      <Text>{record?.lastname}</Text>
      <Title level={5}>Email</Title>
      <Text>{record?.email}</Text>
      <Title level={5}>Phone</Title>
      <Text>{record?.phone}</Text>
    </Show>
  );
};
