import axios from "axios";

const API_URL = "/api/auth/";

//The service uses Axios for HTTP requests and Local Storage for user information & JWT.
//It provides following important methods:

const register = ({
  username,
  password,
  firstname,
  lastname,
  telephone,
  fulladdress,
  ssn,
  role,
  adminkey,
}) => {
  return axios.post(API_URL + "signup", {
    username,
    password,
    firstname,
    lastname,
    telephone,
    fulladdress,
    ssn,
    role,
    adminkey,
  });
};

const login = (username, password) => {
  return axios
    .post(API_URL + "signin", {
      username,
      password,
    })
    .then((response) => {
      if (response.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }

      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem("user");
};

export default {
  register,
  login,
  logout,
};
