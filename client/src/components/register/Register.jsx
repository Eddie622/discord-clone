import React, { useState } from "react";
import { Button } from "@material-ui/core";
import { Link, navigate } from "@reach/router";
import "./Register.css";
import axios from "axios";

const Register = () => {
  const [username, setUsername] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [photo, setPhoto] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});

  const register = (e) => {
    e.preventDefault();
    const newUser = { username, displayName, photo, password, confirmPassword };
    axios
      .post(`http://localhost:8000/api/register`, newUser, {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res);
        if (res.data.errors) {
          setErrors(res.data.errors);
        } else {
          navigate("/");
        }
      })
      .catch((errors) => console.log(errors));
  };

  return (
    <div className="register">
      <form onSubmit={register}>
        <h4>REGISTER</h4>
        <label htmlFor="username">
          Username{" "}
          {errors.username ? (
            <span className="text-danger">
              {errors.username.properties.message}
            </span>
          ) : (
            ""
          )}
        </label>
        <input
          name="username"
          type="text"
          onChange={(e) => setUsername(e.target.value)}
        ></input>
        <label htmlFor="displayName">
          Display Name{" "}
          {errors.displayName ? (
            <p className="text-danger">
              {errors.displayName.properties.message}
            </p>
          ) : (
            ""
          )}
        </label>
        <input
          name="displayName"
          type="text"
          onChange={(e) => setDisplayName(e.target.value)}
        ></input>
        <label htmlFor="photo">
          Photo (URL){" "}
          {errors.photo ? (
            <p className="text-danger">{errors.photo.properties.message}</p>
          ) : (
            ""
          )}
        </label>
        <input
          name="photo"
          type="text"
          onChange={(e) => setPhoto(e.target.value)}
        ></input>
        <label htmlFor="password">
          Password{" "}
          {errors.password ? (
            <p className="text-danger">{errors.password.properties.message}</p>
          ) : (
            ""
          )}
        </label>
        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        ></input>
        <label htmlFor="confirmPassword">
          Confirm Password{" "}
          {errors.confirmPassword ? (
            <p className="text-danger">
              {errors.confirmPassword.properties.message}
            </p>
          ) : (
            ""
          )}
        </label>
        <input
          name="confirmPassword"
          type="password"
          onChange={(e) => setConfirmPassword(e.target.value)}
        ></input>
        <Button type="submit">Submit</Button>
        <Link className="return_link" to="../">
          Return
        </Link>
      </form>
    </div>
  );
};

export default Register;
