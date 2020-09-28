import { SET_MESSAGE, CLEAR_MESSAGE } from "./type";
//This Redux action creator is for actions related to messages (notifications) from APIs.
export const setMessage = (message) => ({
  type: SET_MESSAGE,
  payload: message,
});

export const clearMessage = () => ({
  type: CLEAR_MESSAGE,
});
