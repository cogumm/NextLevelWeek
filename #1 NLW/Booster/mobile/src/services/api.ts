import axios from "axios";

const API = axios.create({
  baseURL: "http://172.18.93.241:3001",
});

export default API;
