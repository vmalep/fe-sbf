import {
  useCreate,
  useGetIdentity
} from "@pankod/refine-core";

import { IReservation } from "interfaces";

const CreateReservation = async (id: string) => {
  const { mutate } = useCreate<IReservation>();
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

};

export default CreateReservation; 