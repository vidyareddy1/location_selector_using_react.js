import axios from "axios";

// Country, State and City API
const API = axios.create({
  baseURL: "https://countriesnow.space/api/v0.1",
});

// India Post API
const POST_API = axios.create({
  baseURL: "https://api.postalpincode.in",
});

export default API;
export { POST_API };