import axios from "axios";
import { urlBase } from "@ltp/services/urlAPI";
import https from "https";

const httpsAgent = new https.Agent({
  rejectUnauthorized: false,
});
const client = axios.create({
  baseURL: urlBase,
  headers: {
    "Content-Type": "application/json",
  },
  httpsAgent,
});

export default client;
