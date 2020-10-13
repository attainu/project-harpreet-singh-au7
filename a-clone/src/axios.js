import axios from "axios";

const instance = axios.create({
  baseURL: "https://a-clone.herokuapp.com/",
  //  "https://a-clone.herokuapp.com/",
  // http://localhost:8080/
});

export default instance;
