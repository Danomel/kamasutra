import s from "./Dialogs.module.css";
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import React from "react";
import { Navigate } from "react-router-dom";
import DialogsForm from "./Message/DialogsForm";
const Dialogs = (props) => {
  let state = props.dialogsPage;
  let dialogsElements = state.dialogs.map((d) => (
    <DialogItem name={d.name} id={d.id} key={d.id} />
  ));
  let messageElements = state.messages.map((m) => (
    <Message message={m.message} key={m.id} />
  ));

  if (!props.isAuth) return <Navigate to={"/login"} />;

  return (
    <div className={s.dialogs}>
      <div className={s.dialogsItems}>{dialogsElements}</div>
      <div className={s.messages}>
        <div>{messageElements}</div>
        <DialogsForm onSendMessageClick={props.onSendMessageClick} />
      </div>
    </div>
  );
};

export default Dialogs;
