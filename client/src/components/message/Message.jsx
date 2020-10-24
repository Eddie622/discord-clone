import { Avatar } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import "./Message.css";
import moment from "moment";
import axios from "axios";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/userSlice";
import { selectChannelId } from "../../features/appSlice";

const Message = (props) => {
  const [creator, setCreator] = useState("");
  const user = useSelector(selectUser);
  const channelId = useSelector(selectChannelId);

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/user/${props.user_id}`, {
        withCredentials: true,
      })
      .then((res) => {
        setCreator(res.data);
      })
      .catch((errors) => console.log(errors));
  }, [props.user_id]);

  const handleDelete = () => {
    axios
      .put(`http://localhost:8000/api/channel/${channelId}/remove_message`, {
        message_id: props._id,
      })
      .then((res) => console.log(res), props.getMessages())
      .catch((errors) => console.log(errors));
  };

  return (
    <div className="message">
      <Avatar src={creator.photo} />
      <div className="message_info">
        <h4>
          {creator.displayName}
          <span className="message_timestamp">
            {moment(props.timestamp).startOf("hour").fromNow()}
          </span>
          {user._id === creator._id ? (
            <>
              {/* <EditIcon /> */}
              <DeleteForeverIcon onClick={handleDelete} />
            </>
          ) : (
            ""
          )}
        </h4>
        <p>{props.content}</p>
      </div>
    </div>
  );
};

export default Message;
