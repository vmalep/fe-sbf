import {
  useShow,
  IResourceComponentsProps,
  useGetIdentity,
} from "@pankod/refine-core";

import {
  Show,
  Typography,
  EditButton,
  DeleteButton,
} from "@pankod/refine-antd";

import { IBook } from "interfaces";

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
  const { data: currUser } = useGetIdentity();
  const { data, isLoading } = queryResult;
  const record = data?.data;
  const owner = record?.users_permissions_user;
  const library = record?.library.data?.attributes;

  const renderBook = () => (
    <Show
      isLoading={isLoading}
      pageHeaderProps={{
        extra: (
          <>
            {(currUser?.id === owner?.data.id) && (
              <>
                <EditButton size="large" recordItemId={record?.id} />
                <DeleteButton size="large" recordItemId={record?.id} />
              </>
            )}
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
{/*       {(currUser.id === owner?.data.id) && (
        <Card>
          <List title="Reservations">
            {RenderReservations(
              {
                filteredReservationsTableProps,
                formProps,
                isEditing,
                setEditId,
                saveButtonProps,
                cancelButtonProps,
                editButtonProps,
              }
            )}
          </List>
        </Card>
      )} */}
    </>
  )
};
