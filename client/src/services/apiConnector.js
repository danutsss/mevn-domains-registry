import axios from "axios";

export const isLoggedIn = () => {
    return localStorage.getItem("jwtToken") !== null;
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
            "X-Auth-App-Key":
                "HS9hdWcdsV34MXGy/VKKloywDwZeVORNGAfZlHQNQM2sAQM03bSPOodm/9eQ1qpH",
        },
    });
};
