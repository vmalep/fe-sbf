import { useShow, IResourceComponentsProps, useCreate, useGetIdentity } from "@pankod/refine-core";

import { Show, Typography, Button } from "@pankod/refine-antd";

import { RenderReservations } from "components/customRenders";

import { IBook, IReservation } from "interfaces";
import NormalizeData from "helpers/normalizeData";

const { Title, Text } = Typography;

export const BookShow: React.FC<IResourceComponentsProps> = () => {
  const { queryResult } = useShow<IBook>({
    metaData: {
      populate: [
        "users_permissions_user",
        "library",
        "reservations",
        "reservations.users_permissions_user",
      ],
    },
  });
  const { mutate } = useCreate<IReservation>();
  const { data: currUser } = useGetIdentity();
  const { data, isLoading } = queryResult;
  const record = data?.data;
  const owner = record?.users_permissions_user;
  const library = record?.library.data?.attributes;
  const reservations = NormalizeData(record?.reservations);
  //const filteredReservations = reservations?.filter((reservation: any) => (reservation.users_permissions_user.id === currUser.id))
  console.log('reservations 1: ', reservations);
  
  const renderBook = () => (
    <Show
      isLoading={isLoading}
      pageHeaderProps={{
        extra: (
          <>
            <Button
              onClick={() => {
                mutate({
                  resource: "reservations",
                  values: {
                    book: record?.id,
                    users_permissions_user: currUser.id,
                    status: "interested"
                  }
                })
              }}
            >
              Sélectionner
            </Button>
          </>
        ),
      }}
    >
      <Title level={5}>Id</Title>
      <Text>{record?.id}</Text>
      <Title level={5}>Title</Title>
      <Text>{library?.title}</Text>
      <Title level={5}>Owner</Title>
      <Text>{owner?.data?.attributes.username}</Text>
      <Title level={5}>Price</Title>
      <Text>{record?.price}</Text>
    </Show>
  );

  return (
    <>
      {renderBook()}
      {(currUser.id === owner?.data.id) && RenderReservations(reservations)}
    </>
  )
};
