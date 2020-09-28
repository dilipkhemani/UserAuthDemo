import React from "react";
import { useSelector } from "react-redux";
import { Switch, Route } from "react-router-dom";
import { Redirect } from "react-router-dom";

import Login from "../components/Login";
import Register from "../components/Register";
import SignupAdmin from "../components/SignupAdmin";
import Profile from "../components/Profile";
import BoardAdmin from "../components/BoardAdmin";

// Custom routers
import ProtectedRoute from "./ProtectedRoute";

//All routes defined here.
//Protected Route setup for Admin Board.
const URLRoutes = () => {
  const { user: currentUser } = useSelector((state) => state.auth);

  return (
    <Switch>
      <Route
        exact
        path="/"
        render={() =>
          currentUser && currentUser.role === "admin" ? (
            <Redirect to="/admin" />
          ) : currentUser ? (
            <Redirect to="/profile" />
          ) : (
            <Redirect to="/register" />
          )
        }
      />
      <Route exact path="/login" component={Login} />
      <Route exact path="/register" component={Register} />
      <Route exact path="/signupadmin" component={SignupAdmin} />
      <Route exact path="/profile" component={Profile} />
      <ProtectedRoute exact path="/admin" component={BoardAdmin} />
      <Route component={Register} />
    </Switch>
  );
};

export default URLRoutes;
