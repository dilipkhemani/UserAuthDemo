import React from "react";
import { shallow, mount } from "enzyme";
import App from "./App";
import toJson from "enzyme-to-json";
import { Provider } from "react-redux";
import store from "../store";

it("renders without crashing", () => {
  shallow(
    <Provider store={store}>
      <App />
    </Provider>
  );
});

it("App Snapshot test", () => {
  const tree = shallow(
    <Provider store={store}>
      <App />
    </Provider>
  );
  expect(toJson(tree)).toMatchSnapshot();
});
