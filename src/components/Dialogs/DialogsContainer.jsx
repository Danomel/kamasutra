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
import StoreContext from "../../storeContext";
const DialogsContainer = (props) => {
  return (
    <StoreContext.Consumer>
      {(store) => {
        let state = store.getState();
        let onSendMessageClick = () => {
          store.dispatch(sendMessageCreater());
        };

        let onNewMessageChange = (body) => {
          store.dispatch(updateNewMessageBodyCreater(body));
        };
        return (
          <Dialogs
            onSendMessageClick={onSendMessageClick}
            onNewMessageChange={onNewMessageChange}
            dialogs={state.dialogsPage.dialogs}
            messages={state.dialogsPage.messages}
          />
        );
      }}
    </StoreContext.Consumer>
  );
};

export default DialogsContainer;
