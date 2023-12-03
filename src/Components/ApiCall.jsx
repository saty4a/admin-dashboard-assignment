import axios from "axios";

const fetchData = async () => {
    const response = await axios
      .get(
        "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
      )
      .then((res) => {
        if (res.status === 200) {
            return res.data;
        };
      });
      if (response) {
        return response
      }
};

export default fetchData;