import axios from "axios";
//import { ISchoolYear } from "interfaces";

const GetCurrSchoolYear = (API_URL: string) => ({

  title: async (id: any, token: string) => {

    // populate request
    const qs = require('qs')
    const query = qs.stringify(
      {
        fields: ["title"]
    },
    )
    const data = await axios.get(`${API_URL}/school-years/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(data);
    const title: string = data?.data.data.attributes.title;

    return title ? title : "";
  },
});

export default GetCurrSchoolYear;