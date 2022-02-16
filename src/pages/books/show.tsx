import { useShow, IResourceComponentsProps } from "@pankod/refine-core";

import { Show, Typography } from "@pankod/refine-antd";

import { RenderReservations } from "components/customRenders/reservationsList";

import { IBook } from "interfaces";
import NormalizeData from "helpers/normalizeData";

const { Title, Text } = Typography;

export const BookShow: React.FC<IResourceComponentsProps> = () => {
  const { queryResult } = useShow<IBook>({
    metaData: {
      populate: "*",
    },
  });
  const { data, isLoading } = queryResult;
  const record = data?.data;
  console.log('rec book show: ', record);
  const library = record?.library.data?.attributes;
  const user = record?.users_permissions_user.data?.attributes;
  const reservations = NormalizeData(record?.reservations);

  const renderBook = () => (
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

  return (
    <>
      {renderBook()}
      {RenderReservations(reservations)}
    </>
  )
};
