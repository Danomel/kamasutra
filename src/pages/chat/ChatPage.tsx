import { ChatMessageAPIType } from "api/chat-api";
import { FC, memo, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  ChatMessageType,
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

  const status = useSelector((state: AppStateType) => state.chat.status);

  useEffect(() => {
    dispatch(startMessagesListening());
    return () => {
      dispatch(stopMessagesListening());
    };
  }, []);

  return (
    <div>
      {status === "error" && (
        <div>Some error occured. Please refresh the page</div>
      )}

      <Messages />
      <AddMessageForm />
    </div>
  );
};
const Messages: React.FC = () => {
  const messages = useSelector((state: AppStateType) => state.chat.messages);
  const messagesAnchorRef = useRef<HTMLDivElement>(null);
  const [isAutoScroll, setIsAutoScroll] = useState(false);
  const scrollHandler = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
    const element = e.currentTarget;
    if (
      Math.abs(
        element.scrollHeight - element.scrollTop - element.clientHeight
      ) < 300
    ) {
      !isAutoScroll && setIsAutoScroll(true);
    } else {
      isAutoScroll && setIsAutoScroll(false);
    }
  };
  useEffect(() => {
    if (isAutoScroll) {
      messagesAnchorRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);
  return (
    <div
      style={{ height: "400px", overflowY: "auto" }}
      onScroll={scrollHandler}
    >
      {messages.map((m: ChatMessageType, index: number) => (
        <Message key={m.id} message={m} />
      ))}
      <div ref={messagesAnchorRef}></div>
    </div>
  );
};

const Message: FC<{ message: ChatMessageAPIType }> = memo(({ message }) => {
  return (
    <div>
      <img alt="" src={message.photo} width="30px" /> <b>{message.userName}</b>
      <br />
      {message.message}
      <hr />
    </div>
  );
});

const AddMessageForm: React.FC = () => {
  const [message, setMessage] = useState("");
  const dispatch: AppDispatch = useDispatch();
  const status = useSelector((state: AppStateType) => state.chat.status);
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
        ></textarea>
      </div>
      <div>
        <button disabled={status !== "ready"} onClick={sendMessageHandler}>
          Отправить
        </button>
      </div>
    </div>
  );
};

export default ChatPage;
