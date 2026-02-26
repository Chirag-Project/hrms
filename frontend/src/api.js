import axios from "axios";

const API = axios.create({
  baseURL: "https://hrms-ex8p.onrender.com/api/"

});

export default API;
