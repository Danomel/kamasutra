// @ts-ignore
import s from "./Dialogs.module.css";
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import React, { FC } from "react";
import DialogsForm from "./Message/DialogsForm";
import { InitialStateType } from "../../redux/dialogs-reducer";

type OwnPropsType = {
  dialogsPage: InitialStateType;
  SendMessage: (newMessageText: string) => void;
};
const Dialogs: FC<OwnPropsType> = ({ dialogsPage, SendMessage }) => {
  let state = dialogsPage;
  let dialogsElements = state.dialogs.map((d) => (
    <DialogItem name={d.name} id={d.id} key={d.id} />
  ));
  let messageElements = state.messages.map((m) => (
    <Message message={m.message} key={m.id} />
  ));

  return (
    <div className={s.dialogs}>
      <div className={s.dialogsItems}>{dialogsElements}</div>
      <div className={s.messages}>
        <div>{messageElements}</div>
        <DialogsForm SendMessage={SendMessage} />
      </div>
    </div>
  );
};

export default Dialogs;
