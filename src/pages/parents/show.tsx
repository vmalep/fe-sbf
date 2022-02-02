import {
  Show,
  useShow,
  Typography,
  IResourceComponentsProps,
} from "@pankod/refine";

import { IParent } from "interfaces";

const { Title, Text } = Typography;

export const ParentShow: React.FC<IResourceComponentsProps> = () => {
  const { queryResult } = useShow<IParent>();
  const { data, isLoading } = queryResult;
  const record = data?.data;

  return (
    <Show isLoading={isLoading}>
      <Title level={5}>Id</Title>
      <Text>{record?.id}</Text>
      <Title level={5}>Username</Title>
      <Text>{record?.username}</Text>
      <Title level={5}>Email</Title>
      <Text>{record?.email}</Text>
    </Show>
  );
};
