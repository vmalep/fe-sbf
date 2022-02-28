import {
  useShow,
  useCreate,
  IResourceComponentsProps,
  useGetIdentity,
  useNavigation,
} from "@pankod/refine-core";

import { Show, Typography } from "@pankod/refine-antd";

import { RenderBooks, RenderReservations } from "components/customRenders";

import { IUser, IReservation } from "interfaces";
import NormalizeData from "helpers/normalizeData";

const { Title, Text } = Typography;

export const UserShow: React.FC<IResourceComponentsProps> = () => {
  const { queryResult } = useShow<IUser>({
    metaData: {
      populate: [
        "role",
        "books",
        "books.library",
        "reservations",
      ],
    },
  });
  const { data, isLoading } = queryResult;
  const record = data?.data;
  const books = NormalizeData(record?.books);
  const reservations = NormalizeData(record?.reservations);
  const { data: user } = useGetIdentity();
  const { show } = useNavigation();
  const { mutate: createReservation } = useCreate<IReservation>();

  //console.log('current user: ', user);
  console.log('user record: ', record);

  const renderUser = () => (
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

  return (
    <>
      {renderUser()}
      {RenderBooks({books, currUser: user, show, createReservation})}
      {RenderReservations(reservations)}
    </>
  )
};
