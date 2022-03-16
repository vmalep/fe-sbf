import {
  useShow,
  IResourceComponentsProps,
  useGetIdentity,
  useForm,
} from "@pankod/refine-core";

import {
  Show,
  Typography,
  EditButton,
  DeleteButton,
  List,
  Card,
  useEditableTable,
} from "@pankod/refine-antd";

import { RenderReservations } from "components/customRenders";

import { IBook, IReservation } from "interfaces";

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

  const {
    tableProps: filteredReservationsTableProps,
    formProps,
    isEditing,
    setId: setEditId,
    saveButtonProps,
    cancelButtonProps,
    editButtonProps,
  } = useEditableTable<IReservation>({
    resource: "reservations",
    redirect: false,
    initialSorter: [
      {
        field: "id",
        order: "desc",
      },
    ],
    metaData: {
      populate: [
        "users_permissions_user",
        "book",
        "book.library",
        "book.users_permissions_user",
      ],
    },
    permanentFilter: [
      {
        field: "book.id",
        operator: "eq",
        value: record?.id,
      },
    ],
  });

  //console.log('filteredReservationsTableProps: ', filteredReservationsTableProps);

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
      {(currUser.id === owner?.data.id) && (
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
      )}
    </>
  )
};
