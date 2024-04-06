import React from "react";
import s from "./MyPosts.module.css";
import Post from "./Post/Post";
import {
  addPostActionCreater,
  updateNewPostTextActionCreaater,
} from "../../../redux/state";

const MyPosts = (props) => {
  let postsElements = props.otherPosts.map((p) => (
    <Post message={p.message} like={p.like} />
  ));

  let newPostElement = React.createRef();

  let addPost = () => {
    props.dispatch(addPostActionCreater());
  };

  let onPostChange = () => {
    let text = newPostElement.current.value;
    // props.dispatch({ type: "UPDATE-NEW-TEXT", text: text });
    props.dispatch(updateNewPostTextActionCreaater(text));
  };

  return (
    <div className={s.postsBlock}>
      My posts
      <div>
        <div>
          <textarea
            ref={newPostElement}
            onChange={onPostChange}
            value={props.newPostText}
          />
        </div>
        <div>
          <button onClick={addPost}>Add post</button>
        </div>
        <div>
          <button>Remove</button>
        </div>
      </div>
      <div className={s.posts}>{postsElements}</div>
    </div>
  );
};

export default MyPosts;
