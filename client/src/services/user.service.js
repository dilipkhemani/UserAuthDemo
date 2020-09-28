import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "/api/test/";

//Use auth-header() helper function to add JWT to HTTP header.
//auth-header() returns an object containing the JWT of the currently logged in user from Local Storage.
const getAdminBoard = () => {
  return axios.get(API_URL + "admin", { headers: authHeader() });
};

export default {
  getAdminBoard,
};
