import axios from "axios";
const instance = axios.create({
  baseURL: "http://localhost:5001/aclone-4da0f/us-central1/api",
});

export default instance;
