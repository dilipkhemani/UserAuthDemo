import React from "react";
import { Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

//Profile component displays user information after the login action is successful.
const Profile = () => {
  const { user: currentUser } = useSelector((state) => state.auth);

  if (!currentUser) {
    return <Redirect to="/login" />;
  }

  return (
    <div className="container">
      <header className="jumbotron">
        <h3>
          <strong>{currentUser.username}</strong> Profile
        </h3>
      </header>
      <p>
        <strong>Username:</strong> {currentUser.username}
      </p>
      <p>
        <strong>Role:</strong> {currentUser.role}
      </p>
      <p>
        <strong>First Name:</strong> {currentUser.firstname}
      </p>
      <p>
        <strong>Last Name:</strong> {currentUser.lastname}
      </p>
      <p>
        <strong>Telephone:</strong> {currentUser.telephone}
      </p>
      <p>
        <strong>Full Address:</strong> {currentUser.fulladdress}
      </p>
      <p>
        <strong>SSN:</strong> {currentUser.ssn}
      </p>
    </div>
  );
};

export default Profile;
