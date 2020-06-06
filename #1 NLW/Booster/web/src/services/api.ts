import axios from "axios";

const API = axios.create({
    baseURL: "http://192.168.0.22:3001",
});

export default API;
