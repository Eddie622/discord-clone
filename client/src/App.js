import React from "react";
import SideBar from "./components/sidebar/Sidebar";
import Chat from "./components/chat/Chat";
import "./App.css";
import Login from "./components/login/Login";
import { Router } from "@reach/router";
import Register from "./components/register/Register";
import { selectUser } from "./features/userSlice";
import { useSelector } from "react-redux";

function App() {

  const user = useSelector(selectUser);

  const Dash = () => {
    return(
      <div className="app">
            <SideBar/>
            <Chat/>
      </div>
    )
  }

  return (
    <div>
      <Router>
        {user ? 
        (
          <Dash path ="/app"/>
        ) : (
          <>
          <Login path="/" />
          <Register path="/register"/>
          </>
        )
      }
      </Router>
    </div>
  );
}

export default App;
