import React, { useCallback, useEffect } from "react";
import "./Sidebar.css";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import AddIcon from "@material-ui/icons/Add";
import SidebarChannel from "../sidebarChannel/SidebarChannel";
import SignalCellularAltIcon from "@material-ui/icons/SignalCellularAlt";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import CallIcon from "@material-ui/icons/Call";
import { Avatar, Tooltip } from "@material-ui/core";
import MicIcon from "@material-ui/icons/Mic";
import HeadsetIcon from "@material-ui/icons/Headset";
import SettingsIcon from "@material-ui/icons/Settings";
import { logout, selectUser } from "../../features/userSlice";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { selectChannels, setChannels } from "../../features/appSlice";

const Sidebar = () => {
  const user = useSelector(selectUser);
  const channels = useSelector(selectChannels);

  const dispatch = useDispatch();

  const getChannels = useCallback(() => {
    axios
      .get(`http://localhost:8000/api/channel/`, { withCredentials: true })
      .then((res) =>
        dispatch(
          setChannels({
            channels: res.data,
          })
        )
      )
      .catch((errors) => console.log(errors));
  }, [dispatch]);

  useEffect(() => {
    getChannels();
  }, [user._id, getChannels]);

  const handleLogout = () => {
    dispatch(logout());
    axios
      .post(`http://localhost:8000/api/logout`, {}, { withCredentials: true })
      .then((res) => console.log(res))
      .catch((errors) => console.log(errors));
  };

  const createNewChannel = async () => {
    await axios
      .post(
        `http://localhost:8000/api/channel`,
        {
          creator_id: user._id,
          name: "NewChannel",
        },
        { withCredentials: true }
      )
      .then((res) => console.log(res))
      .catch((errors) => console.log(errors));
    getChannels();
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
          <Tooltip title="create channel" placement="top">
            <AddIcon
              onClick={createNewChannel}
              className="sidebar_addChannel"
            />
          </Tooltip>
        </div>

        <div className="sidebar_channelsList">
          {channels.map(({ _id, name, creator_id }) => (
            <SidebarChannel
              key={_id}
              channelId={_id}
              channelName={name}
              creatorID={creator_id}
              getChannels={getChannels}
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
          <Tooltip title="logout">
            <SettingsIcon className="setting" onClick={handleLogout} />
          </Tooltip>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
