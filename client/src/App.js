import React, { useEffect } from "react";
import SideBar from "./components/sidebar/Sidebar";
import Chat from "./components/chat/Chat";
import "./App.css";
import Login from "./components/login/Login";
import { Router } from "@reach/router";
import Register from "./components/register/Register";
import { login, selectUser } from "./features/userSlice";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

function App() {

  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    axios.get(`http://localhost:8000/api/users/loggedin`, { withCredentials: true })
      .then(res => {
        dispatch(login({
          _id: res.data._id,
          username: res.data.username,
          photo: res.data.photo,
          displayName: res.data.displayName,
          channels: res.data.channels
        }))
      }).catch(errors => console.log(errors)
      );
  }, [dispatch]);

  const Dash = () => {
    return (
      <div className="app">
        <SideBar />
        <Chat />
      </div>
    )
  }

  return (
    <div>
      <Router>
        {user ?
          (
            <Dash path="/" />
          ) : (
            <>
              <Login path="/" />
              <Register path="/register" />
            </>
          )
        }
      </Router>
    </div>
  );
}

export default App;
