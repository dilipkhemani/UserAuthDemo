//auth-header() returns an object containing the JWT of the currently logged in user from Local Storage.
const authHeader = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  //Checks Local Storage for user item.
  //If there is a logged in user with accessToken (JWT), return HTTP Authorization header.
  //Otherwise, return an empty object.
  //For Node.js Express back-end, need to use x-access-token header
  if (user && user.accessToken) {
    return { "x-access-token": user.accessToken };
  } else {
    return {};
  }
};

export default authHeader;
