import React from "react";
import { shallow, mount } from "enzyme";
import Login from "./Login";
import toJson from "enzyme-to-json";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";

const mockStore = configureStore();

const initialState = {
  auth: {
    isLoggedIn: true,
    user: {
      id: "5f71d99752c72543785374fb",
      username: "dev",
      firstname: "Krish",
      lastname: "Khemani",
      telephone: "223232323",
      fulladdress: "dfdf df df we",
      ssn: "011234567",
      role: "user",
      accessToken:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmNzFkOTk3NTJjNzI1NDM3ODUzNzRmYiIsImlhdCI6MTYwMTI5Njc5OSwiZXhwIjoxNjAxMzgzMTk5fQ.Fok-H2kRtdujroz-XEl0LXTX5PwA7bhx0W5IpuKfY78",
    },
  },
  message: {},
};
const store = mockStore(initialState);

it("renders without crashing", () => {
  shallow(
    <Provider store={store}>
      <Login />
    </Provider>
  );
});

it("App Snapshot test", () => {
  const tree = shallow(
    <Provider store={store}>
      <Login />
    </Provider>
  );
  expect(toJson(tree)).toMatchSnapshot();
});
