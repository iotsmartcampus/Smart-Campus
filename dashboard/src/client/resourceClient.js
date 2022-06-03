import axios from "axios";
const baseUrl = "http://200.129.39.36:3010/";

const client = axios.create({
  baseURL: baseUrl,
});

export default client;
