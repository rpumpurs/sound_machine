import axios from "axios";

export default axios.create({
  baseURL: "http://" + location.host + "/api",
  headers: {
    "Content-type": "application/json"
  }
});
