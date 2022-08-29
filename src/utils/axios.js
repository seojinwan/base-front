import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8888",
  timeout: 100000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default instance;
