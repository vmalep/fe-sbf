import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL!;

const GetUserRole = () => ({

  role: async (id: any, token: string) => {

    // populate request
    const qs = require('qs')
    const query = qs.stringify(
      {
        populate: {
          Product: {
            populate: "*"
          }
        }
      },
      {
        encodeValuesOnly: true
      }
    )
    const data = await axios.get(`${API_URL}/users/${id}/?${query}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const role: string = data?.data.data.attributes.role.data.attributes.type;

    return role ? role : "";
  },
});

export default GetUserRole;