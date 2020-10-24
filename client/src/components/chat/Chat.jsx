import React, { useEffect, useState, useCallback } from "react";
import ChatHeader from "../chatHeader/ChatHeader";
import "./Chat.css";
import Message from "../message/Message";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import CardGiftcardIcon from "@material-ui/icons/CardGiftcard";
import GifIcon from "@material-ui/icons/Gif";
import EmojiEmotionsIcon from "@material-ui/icons/EmojiEmotions";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/userSlice";
import { selectChannelId, selectChannelName } from "../../features/appSlice";
import axios from "axios";
// import io from "socket.io-client";

const Chat = () => {
  const user = useSelector(selectUser);
  const channelId = useSelector(selectChannelId);
  const channelName = useSelector(selectChannelName);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  // const [socket] = useState(() => io(':8000'));

  const getMessages = useCallback(() => {
    axios
      .get(`http://localhost:8000/api/channel/${channelId}`, {
        withCredentials: true,
      })
      .then((res) => setMessages(res.data.messages.reverse()))
      .catch((errors) => console.log(errors));
  }, [channelId]);

  useEffect(() => {
    if (channelId) {
      getMessages();
    }
  }, [channelId, getMessages]);

  // useEffect(() => {
  // 	socket.on("new_message_from_server", msg => {
  // 		setMessages(prevMessages => {
  // 			return [msg, ...prevMessages];
  // 		})
  // 	});
  // }, [socket]);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (input) {
      await axios
        .put(
          `http://localhost:8000/api/channel/${channelId}/add_message`,
          {
            creator_id: user._id,
            content: input,
          },
          { withCredentials: true }
        )
        .then((res) => console.log(res))
        .catch((errors) => console.log(errors));
    }
    setInput("");
    getMessages();
  };

  return (
    <div className="chat">
      <ChatHeader />

      <div className="chat_messages">
        {messages.map((message) => (
          <Message
            key={message._id}
            _id={message._id}
            content={message.content}
            user_id={message.creator_id}
            timestamp={message.createdAt}
            getMessages={getMessages}
          />
        ))}
      </div>

      <div className="chat_input">
        <AddCircleIcon fontSize="large" />
        <form>
          <input
            disabled={!channelId}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={`Message #${channelName}`}
          />
          <button
            disabled={!channelId}
            onClick={sendMessage}
            className="chat_inputButton"
            type="submit"
          ></button>
        </form>

        <div className="chat_inputIcons">
          <CardGiftcardIcon fontSize="large" />
          <GifIcon fontSize="large" />
          <EmojiEmotionsIcon fontSize="large" />
        </div>
      </div>
    </div>
  );
};

export default Chat;
