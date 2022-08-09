import axios from "axios";
import config from "@/config/dev";

export const isLoggedIn = () => {
  return !!localStorage.getItem("token");
};

export default () => {
  return axios.create({
    baseURL: "http://localhost:3000",
    withCredentials: true,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
};

export const ucrmApiRequest = (method, url, data) => {
  return axios({
    method: method,
    url: url,
    data: data,
    headers: {
      "Content-Type": "application/json",
      "X-Auth-App-Key": config.ucrmApiKey,
    },
  });
};
