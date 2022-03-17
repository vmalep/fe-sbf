import axios from "axios";
import qs from 'qs';

const API_URL = process.env.REACT_APP_API_URL!;

const GetBookTitle = async (id: any) => {

   const query = qs.stringify(
    {
      fields: ["title"]
    },
    )
    const data = await axios.get(`${API_URL}/books/${id}/?${query}`, {
    });
    const title: string = data?.data.data.attributes.title;
    //console.log('title: ', title);
    return title ? title : "";
};

export default GetBookTitle; 