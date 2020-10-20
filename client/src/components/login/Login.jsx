import { Button } from "@material-ui/core";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../../features/userSlice";
import axios from "axios";
import "./Login.css";
import { Link, navigate } from "@reach/router";

const Login = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");

	const dispatch = useDispatch();

	const signIn = e => {
		e.preventDefault();

		axios.post(`http://localhost:8000/api/login`, { username, password }, {withCredentials : true})
			.then( res => {
				axios.get(`http://localhost:8000/api/users/loggedin`, {withCredentials : true})
					.then( res => {
						dispatch(login({
							_id: res.data._id,
							username: res.data.username,
							photo: res.data.photo,
							displayName: res.data.displayName,
							channels: res.data.channels
						}))
						navigate("/app");
					}).catch(errors => console.log(errors)
				);
			}).catch(errors => console.log(errors), setError("Invalid Username / Password")
		);
	}

	const guestSignIn = e => {
		e.preventDefault();

		setUsername("guestuser");
		setPassword("guestpass");

		axios.post(`http://localhost:8000/api/login`, { username, password }, {withCredentials : true})
			.then( res => {
				axios.get(`http://localhost:8000/api/users/loggedin`, {withCredentials : true})
					.then( res => {
						dispatch(login({
							_id: res.data._id,
							username: res.data.username,
							photo: res.data.photo,
							displayName: res.data.displayName,
							channels: res.data.channels
						}))
						navigate("/app");
					}).catch(errors => console.log(errors)
				);
			}).catch(errors => console.log(errors), setError("Invalid Username / Password")
		);
	}

	return (
		<div className="login">
			<div className="login_logo">
				<img src="https://upload.wikimedia.org/wikipedia/sco/thumb/9/98/Discord_logo.svg/800px-Discord_logo.svg.png" alt=""/>
			</div>
			<h3>This Project is still under development. Register or click Guest login twice to use application </h3>
			<form onSubmit={signIn}>
				<label htmlFor="username">
					Username { error ? <p className="text-danger">{error}</p> : ""}
				</label>
				<input type="text" name="username" autoComplete="username" onChange={e => setUsername(e.target.value)}></input>
				<label htmlFor="password">Password</label>
				<input type="password" name="password" autoComplete="current-password" onChange={e => setPassword(e.target.value)}></input>
				<Button type="submit">Sign In</Button>
				<Button className="guestLogin" onClick={guestSignIn}>Guest Sign In</Button>
				<Link className="register_link" to="/register">New around here? Register!</Link>
			</form>
		</div>
	)
};

export default Login;