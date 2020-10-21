import React, { useEffect, useState } from "react";
import "./Sidebar.css";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import AddIcon from "@material-ui/icons/Add";
import SidebarChannel from "../sidebarChannel/SidebarChannel";
import SignalCellularAltIcon from "@material-ui/icons/SignalCellularAlt";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import CallIcon from "@material-ui/icons/Call";
import { Avatar } from "@material-ui/core";
import MicIcon from "@material-ui/icons/Mic";
import HeadsetIcon from "@material-ui/icons/Headset";
import SettingsIcon from "@material-ui/icons/Settings";
import { logout, selectUser } from "../../features/userSlice";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

const Sidebar = () => {
  const user = useSelector(selectUser);
  const [channels, setChannels] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/channel/`)
      .then((res) => {
        setChannels(res.data.filter((c) => c.members.includes(user._id)));
      })
      .catch((errors) => console.log(errors));
  }, [user._id]);

  const handleLogout = () => {
    dispatch(logout());
    axios.post(`http://localhost:8000/api/logout`, { }, {withCredentials : true})
      .then((res) => console.log(res))
      .catch((errors) => console.log(errors))
  }

  const createNewChannel = () => {
    axios
      .post(`http://localhost:8000/api/channel`, {
        creator_id: user._id,
        name: "ChannelName",
      })
      .then((res) => addChannel(res.data._id))
      .catch((errors) => console.log(errors));
  };

  const addChannel = (newChannel_id) => {
    axios
      .put(`http://localhost:8000/api/user/${user._id}/add_channel`, {
        channel_id: newChannel_id,
      })
      .then((res) => console.log(res))
      .catch((errors) => console.log(errors));
  };

  const handleAddChannel = (e) => {
    e.preventDefault();
    try {
      createNewChannel();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="sidebar">
      <div className="sidebar_top">
        <h3>{user.displayName}</h3>
        <ExpandMoreIcon />
      </div>

      <div className="sidebar_channels">
        <div className="sidebar_channelsHeader">
          <div className="sidebar_header">
            <ExpandMoreIcon />
            <h4>Text Channels</h4>
          </div>
          <AddIcon onClick={handleAddChannel} className="sidebar_addChannel" />
        </div>

        <div className="sidebar_channelsList">
          {channels.map(({ _id, name, creator_id }) => (
            <SidebarChannel
              key={_id}
              channelId={_id}
              channelName={name}
              creatorID={creator_id}
            />
          ))}
        </div>
      </div>

      <div className="sidebar_voice">
        <SignalCellularAltIcon className="sidebar_voiceIcon" fontSize="large" />

        <div className="sidebar_voiceInfo">
          <h3>Voice Connected</h3>
          <p>Stream</p>
        </div>

        <div className="sidebar_voiceIcons">
          <InfoOutlinedIcon />
          <CallIcon />
        </div>
      </div>

      <div className="sidebar_profile">
        <Avatar src={user.photo} />
        <div className="sidebar_profileInfo">
          <h3>{user.username}</h3>
          <p>#{user._id.substring(0, 5)}</p>
        </div>

        <div className="sidebar_profileIcons">
          <MicIcon />
          <HeadsetIcon />
          <SettingsIcon onClick={handleLogout} />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
