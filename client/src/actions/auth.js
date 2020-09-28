import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  SET_MESSAGE,
} from "./type";

import AuthService from "../services/auth.service";

//This is creator for actions related to authentication.
//Import AuthService to make asynchronous HTTP requests with trigger one or more dispatch in the result.
//Return a Promise for Components using them.
export const register = ({
  username,
  password,
  firstname,
  lastname,
  telephone,
  fulladdress,
  ssn,
  role,
  adminkey,
}) => (dispatch) => {
  return AuthService.register({
    username,
    password,
    firstname,
    lastname,
    telephone,
    fulladdress,
    ssn,
    role,
    adminkey,
  }).then(
    (response) => {
      dispatch({ type: REGISTER_SUCCESS });
      dispatch({ type: SET_MESSAGE, payload: response.data.message });
      return Promise.resolve();
    },
    (error) => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      dispatch({ type: REGISTER_FAIL });
      dispatch({ type: SET_MESSAGE, payload: message });
      return Promise.reject();
    }
  );
};

export const login = (username, password) => (dispatch) => {
  return AuthService.login(username, password).then(
    (data) => {
      dispatch({ type: LOGIN_SUCCESS, payload: { user: data } });
      return Promise.resolve();
    },
    (error) => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      dispatch({ type: LOGIN_FAIL });
      dispatch({ type: SET_MESSAGE, payload: message });
      return Promise.reject();
    }
  );
};

export const logout = () => (dispatch) => {
  AuthService.logout();
  dispatch({
    type: LOGOUT,
  });
};
