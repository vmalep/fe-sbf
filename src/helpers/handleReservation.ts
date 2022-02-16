import { useCreate, useGetIdentity } from "@pankod/refine-core";

import "react-mde/lib/styles/css/react-mde-all.css";

import { IReservation } from "interfaces";

const HandleReservation = (props: any) => {

  const  { id } = props;

  const { mutate } = useCreate<IReservation>();
  console.log('entering handle reservation');
  const { data: user } = useGetIdentity();
  console.log('curr user: ', user);

  mutate({
    resource: "reservations",
    values: {
      book: id,
      users_permissions_user: user.id,
      status: "proposed"
    }
  })

  return null;

};

export default HandleReservation;