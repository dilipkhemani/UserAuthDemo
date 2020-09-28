import { combineReducers } from "redux";
import auth from "./auth";
import message from "./message";

//Combine all reducers to be used by 1 store
export default combineReducers({
  auth,
  message,
});
