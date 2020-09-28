import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isValid as ssnValidator } from "ssn-validator";

import { register } from "../actions/auth";

//Form data will be validated by front-end before being sent to back-end.
//React Validations used by form
const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

const vusername = (value) => {
  if (value.length < 3 || value.length > 20) {
    return (
      <div className="alert alert-danger" role="alert">
        The username must be between 3 and 20 characters.
      </div>
    );
  }
};

const vpassword = (value) => {
  if (value.length < 6 || value.length > 40) {
    return (
      <div className="alert alert-danger" role="alert">
        The password must be between 6 and 40 characters.
      </div>
    );
  }
};

const vssn = (value) => {
  if (!ssnValidator(value)) {
    return (
      <div className="alert alert-danger" role="alert">
        Invalid SSN Format. Sample SSN format 011-23-4567 or 011234567
      </div>
    );
  }
};

//Form data will be validated by front-end before being sent to back-end.
//Form for data submission (with support of react-validation library).
//Dispatch auth actions (login/register) to Redux Thunk Middleware
//Thunk uses auth.service to call API.
const Register = () => {
  const form = useRef();
  const checkBtn = useRef();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [telephone, setTelephone] = useState("");
  const [fulladdress, setFulladdress] = useState("");
  const [ssn, setSsn] = useState("");
  const [successful, setSuccessful] = useState(false);
  const [loading, setLoading] = useState(false);

  const { message } = useSelector((state) => state.message);
  const dispatch = useDispatch();

  const onChangeUsername = (e) => {
    const username = e.target.value;
    setUsername(username);
  };

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  const onChangeFirstname = (e) => {
    const firstname = e.target.value;
    setFirstname(firstname);
  };

  const onChangeLastname = (e) => {
    const lastname = e.target.value;
    setLastname(lastname);
  };

  const onChangeTelephone = (e) => {
    const telephone = e.target.value;
    setTelephone(telephone);
  };

  const onChangeFulladdress = (e) => {
    const fulladdress = e.target.value;
    setFulladdress(fulladdress);
  };

  const onChangeSsn = (e) => {
    const ssn = e.target.value;
    setSsn(ssn);
  };

  const handleRegister = (e) => {
    e.preventDefault();

    setSuccessful(false);
    setLoading(true);

    //method to check validation functions in validations.
    form.current.validateAll();
    console.log(form);

    if (checkBtn.current.context._errors.length === 0) {
      const user = {
        username,
        password,
        firstname,
        lastname,
        telephone,
        fulladdress,
        ssn,
      };
      dispatch(register(user))
        .then(() => {
          setSuccessful(true);
        })
        .catch(() => {
          setSuccessful(false);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  };

  return (
    <div className="col-md-12">
      <div className="card card-container">
        <img
          src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
          alt="profile-img"
          className="profile-img-card"
        />

        <Form onSubmit={handleRegister} ref={form}>
          {!successful && (
            <div>
              <div className="form-group">
                <label htmlFor="username">Username</label>
                <Input
                  type="text"
                  className="form-control"
                  name="username"
                  value={username}
                  onChange={onChangeUsername}
                  validations={[required, vusername]}
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">Password</label>
                <Input
                  type="password"
                  className="form-control"
                  name="password"
                  value={password}
                  onChange={onChangePassword}
                  validations={[required, vpassword]}
                />
              </div>

              <div className="form-group">
                <label htmlFor="firstname">First Name</label>
                <Input
                  type="firstname"
                  className="form-control"
                  name="firstname"
                  value={firstname}
                  onChange={onChangeFirstname}
                  validations={[required]}
                />
              </div>

              <div className="form-group">
                <label htmlFor="lastname">Last Name</label>
                <Input
                  type="lastname"
                  className="form-control"
                  name="lastname"
                  value={lastname}
                  onChange={onChangeLastname}
                  validations={[required]}
                />
              </div>

              <div className="form-group">
                <label htmlFor="telephone">Telephone</label>
                <Input
                  type="telephone"
                  className="form-control"
                  name="telephone"
                  value={telephone}
                  onChange={onChangeTelephone}
                  validations={[required]}
                />
              </div>

              <div className="form-group">
                <label htmlFor="fulladdress">Full Address</label>
                <Input
                  type="fulladdress"
                  className="form-control"
                  name="fulladdress"
                  value={fulladdress}
                  onChange={onChangeFulladdress}
                  validations={[required]}
                />
              </div>

              <div className="form-group">
                <label htmlFor="ssn">SSN</label>
                <Input
                  type="ssn"
                  className="form-control"
                  name="ssn"
                  value={ssn}
                  onChange={onChangeSsn}
                  validations={[required, vssn]}
                />
              </div>

              <div className="form-group">
                <button
                  className="btn btn-primary btn-block"
                  disabled={loading}
                >
                  {loading && (
                    <span className="spinner-border spinner-border-sm"></span>
                  )}
                  <span>Register</span>
                </button>
              </div>
            </div>
          )}

          {message && (
            <div className="form-group">
              <div
                className={
                  successful ? "alert alert-success" : "alert alert-danger"
                }
                role="alert"
              >
                {message}
              </div>
            </div>
          )}
          <CheckButton style={{ display: "none" }} ref={checkBtn} />
        </Form>
      </div>
    </div>
  );
};

export default Register;
