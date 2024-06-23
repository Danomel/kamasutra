import s from "./Dialogs.module.css";
import DialogItem from "./DialogItem/DialogItem.tsx";
import Message from "./Message/Message.tsx";
import React, { FC } from "react";
import { Navigate } from "react-router-dom";
import DialogsForm from "./Message/DialogsForm.tsx";
import { DialogsPageType } from "../../types/types";

type PropsType = {
  dialogsPage: DialogsPageType;
  isAuth: boolean;
  onSendMessageClick: (newMessageText: string) => void;
};

const Dialogs: FC<PropsType> = ({
  dialogsPage,
  isAuth,
  onSendMessageClick,
}) => {
  let state = dialogsPage;
  let dialogsElements = state.dialogs.map((d) => (
    <DialogItem name={d.name} id={d.id} key={d.id} />
  ));
  let messageElements = state.messages.map((m) => (
    <Message message={m.message} key={m.id} />
  ));

  if (!isAuth) return <Navigate to={"/login"} />;
  return (
    <div className={s.dialogs}>
      <div className={s.dialogsItems}>{dialogsElements}</div>
      <div className={s.messages}>
        <div>{messageElements}</div>
        <DialogsForm onSendMessageClick={onSendMessageClick} />
      </div>
    </div>
  );
};

export default Dialogs;
