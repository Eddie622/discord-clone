import React from "react";
import "./ChatHeader.css";
import NotificationsIcon from "@material-ui/icons/Notifications";
import PeopleAltRoundedIcon from "@material-ui/icons/PeopleAltRounded";
import SearchRoundedIcon from "@material-ui/icons/SearchRounded";
import SendRoundedIcon from "@material-ui/icons/SendRounded";
import HelpRoundedIcon from "@material-ui/icons/HelpRounded";
import EditIcon from "@material-ui/icons/Edit";
import { useSelector } from "react-redux";
import { selectChannelName } from "../../features/appSlice";

const ChatHeader = () => {
  const channel = useSelector(selectChannelName);

  return (
    <div className="chatHeader">
      <div className="chatHeader_left">
        <h3>
          <span className="chatHeader_hash">#</span>
          {channel}
        </h3>
      </div>

      <div className="chatHeader_right">
        <EditIcon />
        <NotificationsIcon />
        <PeopleAltRoundedIcon />

        <div className="chatHeader_search">
          <input placeholder="Search" />
          <SearchRoundedIcon />
        </div>

        <SendRoundedIcon />
        <HelpRoundedIcon />
      </div>
    </div>
  );
};

export default ChatHeader;
