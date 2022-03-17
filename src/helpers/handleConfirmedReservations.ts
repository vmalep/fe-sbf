/*
This helper is designed to ensure that only 1 reservations per book has the confirmed status
In case the user gives the "confirmed" status to a reservation while there is already another one with this status,
this method will check it and mutate the previous confirmed status to "proposed".
*/

//import { useUpdate, useMany/* , useGetIdentity */ } from "@pankod/refine-core";
import axios from "axios";
import qs from 'qs';

import "react-mde/lib/styles/css/react-mde-all.css";

//import { IReservation } from "interfaces";

const API_URL = process.env.REACT_APP_API_URL!;
const TOKEN_KEY = process.env.REACT_APP_API_TOKEN_KEY!;
const token = localStorage.getItem(TOKEN_KEY);

const HandleConfirmedReservations = (props: any) => {

  const  { currRecordId, reservationsIds } = props;

  const query = qs.stringify(
    {
      fields: ["status"]
    },
  );

  reservationsIds
    .filter((reservationId: string) => reservationId !== currRecordId)
    .map((reservationId: string) => {
      const data = axios.get(`${API_URL}/reservations/${reservationId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      //const status: string = data?.attributes.status;
      return (
        console.log(data)
      )
    });

/*   const query = qs.stringify(
    {
      fields: ["title"]
    },
    )
    const data = await axios.get(`${API_URL}/api/books/${id}/?${query}`, {
    });
    const title: string = data?.data.data.attributes.title;
  
  console.log('reservationsQueryResult: ', reservationsQueryResult); */
  //const { mutate } = useUpdate<IReservation>();
  //const { data: user } = useGetIdentity();
  //console.log('curr user: ', user);



/*   mutate({
    resource: "reservations",
    id: reservationId,
    values: {
      book: bookId,
      users_permissions_user: user.id,
      status: "proposed"
    }
  }) */

  return null;

};

export default HandleConfirmedReservations;