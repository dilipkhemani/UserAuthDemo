import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import { clearMessage } from "../actions/message";

// Custom routers
import URLRoutes from "../router/URLRoutes";
import Header from "./Header";

import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css";

const App = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    history.listen((location) => {
      dispatch(clearMessage()); // clear message when changing location
    });
  }, [dispatch, history]);

  return (
    <div>
      <Header />
      <URLRoutes />
    </div>
  );
};

export default App;
