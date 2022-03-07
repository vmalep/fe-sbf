import { useShow, IResourceComponentsProps } from "@pankod/refine-core";

import { Show, Typography } from "@pankod/refine-antd";

import { IReservation } from "interfaces";

const { Title, Text } = Typography;

export const ReservationShow: React.FC<IResourceComponentsProps> = () => {
  const { queryResult } = useShow<IReservation>({
    metaData: {
      populate: [
        "book",
        "book.library",
        "book.users_permissions_user", // the owner of the book
        "users_permissions_user",     // the user owning the reservation
      ],
    },
  });
  const { data, isLoading } = queryResult;
  const record = data?.data;
  console.log('rec res: ', record);
  const library = record?.book.data.attributes.library.data?.attributes;
  const owner = record?.book.data.attributes.users_permissions_user.data?.attributes;
  const user = record?.users_permissions_user.data?.attributes;

  return (
    <Show isLoading={isLoading}>
      <Title level={5}>Id</Title>
      <Text>{record?.id}</Text>
      <Title level={5}>Title</Title>
      <Text>{library?.title}</Text>
      <Title level={5}>Owner</Title>
      <Text>{owner?.username}</Text>
      <Title level={5}>Reserved by</Title>
      <Text>{user?.username}</Text>
      <Title level={5}>Comment</Title>
      <Text>{record?.comment}</Text>
      <Title level={5}>Status</Title>
      <Text>{record?.status}</Text>
    </Show>
  );
};
