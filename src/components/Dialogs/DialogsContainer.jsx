import { NavLink } from "react-router-dom";
import s from "./Dialogs.module.css";
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import React from "react";
import {
  sendMessageCreater,
  updateNewMessageBodyCreater,
} from "../../redux/dialogs-reducer";
import Dialogs from "./Dialogs";
const DialogsContainer = (props) => {
  let state = props.store.getState();

  let onSendMessageClick = () => {
    props.store.dispatch(sendMessageCreater());
  };

  let onNewMessageChange = (body) => {
    props.store.dispatch(updateNewMessageBodyCreater(body));
  };
  return (
    <Dialogs
      onSendMessageClick={onSendMessageClick}
      onNewMessageChange={onNewMessageChange}
      dialogs={state.dialogsPage.dialogs}
      messages={state.dialogsPage.messages}
    />
  );
};

export default DialogsContainer;
