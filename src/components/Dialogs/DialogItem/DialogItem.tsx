import { NavLink } from "react-router-dom";
import s from "./../Dialogs.module.css";
import React from "react";

const DialogItem: React.FC<{ name: string; id: number }> = ({ name, id }) => {
  let path = "/dialogs/" + id;
  return (
    <div className={`${s.dialog} ${s.active}`}>
      <NavLink to={path}>{name}</NavLink>
    </div>
  );
};

export default DialogItem;
