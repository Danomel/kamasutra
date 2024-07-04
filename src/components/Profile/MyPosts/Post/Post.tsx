import React from "react";
import s from "./Post.module.css";
type PropsType = {
  message: string | null;
  like: number | null;
};
const Post: React.FC<PropsType> = (props) => {
  return (
    <div>
      <div className={s.item}>
        <img
          src="https://avatars.mds.yandex.net/get-kino-vod-films-gallery/28788/47e2fd514411e18b76af786d7417062d/380x240"
          alt=""
        />
        {props.message}
        <div>
          <span>{props.like} Likes</span>
        </div>
      </div>
    </div>
  );
};

export default Post;
