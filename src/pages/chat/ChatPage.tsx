import { ChatMessageType } from "api/chat-api";
import { FC, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  sendMessage,
  startMessagesListening,
  stopMessagesListening,
} from "../../redux/chat-reducer";
import { AppDispatch, AppStateType } from "redux/redux-store";

const ChatPage: React.FC = () => {
  return (
    <div>
      <Chat />
    </div>
  );
};

const Chat: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  useEffect(() => {
    dispatch(startMessagesListening());
    return () => {
      dispatch(stopMessagesListening());
    };
  }, []);

  return (
    <div>
      <Messages />
      <AddMessageForm />
    </div>
  );
};
const Messages: React.FC = () => {
  const messages = useSelector((state: AppStateType) => state.chat.messages);
  return (
    <div style={{ height: "400px", overflowY: "auto" }}>
      {messages.map((m: ChatMessageType, index: number) => (
        <Message key={index} message={m} />
      ))}
    </div>
  );
};

const Message: FC<{ message: ChatMessageType }> = ({ message }) => {
  return (
    <div>
      <img alt="" src={message.photo} width="30px" /> <b>{message.userName}</b>
      <br />
      {message.message}
      <hr />
    </div>
  );
};

const AddMessageForm: React.FC = () => {
  const [message, setMessage] = useState("");
  const dispatch: AppDispatch = useDispatch();
  const sendMessageHandler = () => {
    if (!message) {
      return;
    } else {
      dispatch(sendMessage(message));
      setMessage(""); // Очистка поля ввода после отправки сообщения
    }
  };

  return (
    <div>
      <div>
        <textarea
          onChange={(e) => setMessage(e.currentTarget.value)}
          value={message}
          name=""
          id=""
        ></textarea>
      </div>
      <div>
        <button onClick={sendMessageHandler}>Отправить</button>
      </div>
    </div>
  );
};

export default ChatPage;
