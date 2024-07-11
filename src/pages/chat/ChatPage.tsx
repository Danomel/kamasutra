import { FC, useEffect, useState } from "react";

export type ChatMessageType = {
  message: string;
  photo: string;
  userId: number;
  userName: string;
};

const wsChannel = new WebSocket(
  "wss://social-network.samuraijs.com/handlers/ChatHandler.ashx"
);

const Messages: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessageType[]>([]);

  useEffect(() => {
    const handleMessage = (e: MessageEvent) => {
      let newMessages = JSON.parse(e.data);
      setMessages((prevMessages) => [...prevMessages, ...newMessages]);
    };

    wsChannel.addEventListener("message", handleMessage);

    return () => {
      wsChannel.removeEventListener("message", handleMessage);
    };
  }, []);

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

  const sendMessage = () => {
    if (!message) {
      return;
    } else {
      wsChannel.send(message);
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
        <button onClick={sendMessage}>Отправить</button>
      </div>
    </div>
  );
};

const ChatPage: React.FC = () => {
  return (
    <div>
      <Chat />
    </div>
  );
};

const Chat: React.FC = () => {
  return (
    <div>
      <Messages />
      <AddMessageForm />
    </div>
  );
};

export default ChatPage;
