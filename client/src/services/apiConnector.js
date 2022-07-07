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
