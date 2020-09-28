import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

//Ensure only logged in user with role of admin can move ahead else redirected to home
const ProtectedRoute = ({ component: Component, ...rest }) => {
  const auth = useSelector((state) => state.auth);
  return (
    <Route
      {...rest}
      render={(props) => {
        if (auth.isLoggedIn && auth.user.role === "admin") {
          return <Component {...rest} {...props} />;
        } else {
          return (
            <Redirect
              to={{
                pathname: auth.isLoggedIn ? "/" : "/profile",
                state: {
                  from: props.location,
                },
              }}
            />
          );
        }
      }}
    />
  );
};

export default ProtectedRoute;
