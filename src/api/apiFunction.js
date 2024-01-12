import axios from "axios";

const yourKey = "e329af9483b37135d074e667f5f48020";
const yourToken =
  "ATTA7b429b51abd4c5a77e17cc2148635edce084bc45b889d6a7c21bbadaea2709fc28232EFF";

const baseUrl = "https://api.trello.com/1";

export const get = (from, whose, setData, id = "me") => {
  axios
    .get(`${baseUrl}/${from}/${id}/${whose}?key=${yourKey}&token=${yourToken}`)
    .then((res) => {
      setData(res.data);
    });
};
