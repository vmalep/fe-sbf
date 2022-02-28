import axios from "axios";
//import { ISchoolYear } from "interfaces";
import { API_URL } from "../constants";
import qs from 'qs';

const GetBookTitle = async (id: any) => {

   const query = qs.stringify(
    {
      fields: ["title"]
    },
    )
    const data = await axios.get(`${API_URL}/api/books/${id}/?${query}`, {
    });
    const title: string = data?.data.data.attributes.title;
    //console.log('title: ', title);
    return title ? title : "";
};

export default GetBookTitle; 