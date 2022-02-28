import { useShow, IResourceComponentsProps, useGetIdentity } from "@pankod/refine-core";

import { Show, Typography } from "@pankod/refine-antd";

import { IUser } from "interfaces";

const { Title, Text } = Typography;

export const UserShow: React.FC<IResourceComponentsProps> = () => {
  const { queryResult } = useShow<IUser>({
    metaData: {
      populate: [
        "role",
        "books",
        "reservations",
      ],
    },
  });
  const { data, isLoading } = queryResult;
  const record = data?.data;
  const { data: user } = useGetIdentity();
  //console.log('current user: ', user);
  console.log('user record: ', record);

  return (
    <Show
      isLoading={isLoading}
      canDelete={user?.role === "admin"}
      canEdit={user?.role === "admin"}
    >
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
