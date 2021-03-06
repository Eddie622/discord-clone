import { Button } from "@material-ui/core";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../../features/userSlice";
import axios from "axios";
import "./Login.css";
import { Link } from "@reach/router";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const dispatch = useDispatch();

  const signIn = async (e) => {
    e.preventDefault();

    await axios
      .post(
        `http://localhost:8000/api/login`,
        { username, password },
        { withCredentials: true }
      )
      .then(async (res) => {
        console.log(res);
        await axios
          .get(`http://localhost:8000/api/users/loggedin`, {
            withCredentials: true,
          })
          .then((res) => {
            dispatch(
              login({
                _id: res.data._id,
                username: res.data.username,
                photo: res.data.photo,
                displayName: res.data.displayName,
                channels: res.data.channels,
              })
            );
          })
          .catch((errors) => console.log(errors));
      })
      .catch((errors) => {
        if (errors) {
          setError("Invalid Username / Password");
        }
      });
  };

  const guestSignIn = async (e) => {
    e.preventDefault();

    await axios
      .post(
        `http://localhost:8000/api/login`,
        { username: "guestuser", password: "guestpass" },
        { withCredentials: true }
      )
      .then(async (res) => {
        await axios
          .get(`http://localhost:8000/api/users/loggedin`, {
            withCredentials: true,
          })
          .then((res) => {
            dispatch(
              login({
                _id: res.data._id,
                username: res.data.username,
                photo: res.data.photo,
                displayName: res.data.displayName,
                channels: res.data.channels,
              })
            );
          })
          .catch((errors) => console.log(errors));
      })
      .catch((errors) => console.log(errors));
  };

  return (
    <div className="login">
      <div className="login_logo">
        <img
          src="https://upload.wikimedia.org/wikipedia/sco/thumb/9/98/Discord_logo.svg/800px-Discord_logo.svg.png"
          alt=""
        />
      </div>
      <form onSubmit={signIn}>
        <label htmlFor="username">
          Username {error ? <p className="text-danger">{error}</p> : ""}
        </label>
        <input
          type="text"
          name="username"
          autoComplete="username"
          onChange={(e) => setUsername(e.target.value)}
        ></input>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          autoComplete="current-password"
          onChange={(e) => setPassword(e.target.value)}
        ></input>
        <Button type="submit">Sign In</Button>
        <Button className="guestLogin" onClick={guestSignIn}>
          Guest Sign In
        </Button>
        <Link className="register_link" to="/register">
          New around here? Register!
        </Link>
      </form>
    </div>
  );
};

export default Login;
