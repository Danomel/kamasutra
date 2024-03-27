import { NavLink } from "react-router-dom";
import s from "./Dialogs.module.css";

const DialogItem = (props) => {
  let path = "/dialogs/" + props.id;
  return (
    <div className={`${s.dialog} ${s.active}`}>
      <NavLink to={path}>{props.name}</NavLink>
    </div>
  );
};

const Message = (props) => {
  return <div className={s.message}>{props.message}</div>;
};

const Dialogs = (props) => {
  let dialogsData = [
    {
      id: 1,
      name: "Dimych",
    },
    {
      id: 2,
      name: "Andrew",
    },
    {
      id: 3,
      name: "Sveta",
    },
    {
      id: 4,
      name: "Sasha",
    },
    {
      id: 5,
      name: "Viktor",
    },
    {
      id: 6,
      name: "Valera",
    },
  ];

  let messagesData = [
    {
      id: 1,
      message: "Hi",
    },
    {
      id: 2,
      message: "How is your it-kamasutra",
    },
    {
      id: 3,
      message: "Yo",
    },
    {
      id: 4,
      message: "Yo",
    },
    {
      id: 5,
      message: "Yo",
    },
  ];

  return (
    <div className={s.dialogs}>
      <div className={s.dialogsItems}>
        <DialogItem name="Dimych" id="1" />
        <DialogItem name="Andrey" id="2" />
        <DialogItem name="Sveta" id="3" />
        <DialogItem name="Sasha" id="4" />
        <DialogItem name="Viktor" id="5" />
        <DialogItem name="Valera" id="6" />
      </div>
      <div className={s.messages}>
        <Message message="Hi" />
        <Message message="How is your it-kamasutra" />
        <Message message="Yo" />
      </div>
    </div>
  );
};

export default Dialogs;
