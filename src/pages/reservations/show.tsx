import {
  Show,
  useShow,
  Typography,
  IResourceComponentsProps,
} from "@pankod/refine";

import { IReservation } from "interfaces";

const { Title, Text } = Typography;

export const ReservationShow: React.FC<IResourceComponentsProps> = () => {
  const { queryResult } = useShow<IReservation>();
  const { data, isLoading } = queryResult;
  const record = data?.data;

  return (
    <Show isLoading={isLoading}>
      <Title level={5}>Id</Title>
      <Text>{record?.id}</Text>
      <Title level={5}>Comment</Title>
      <Text>{record?.comment}</Text>
    </Show>
  );
};
