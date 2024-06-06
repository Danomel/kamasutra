import React from "react";
import s from "./MyPosts.module.css";
import Post from "./Post/Post";

const MyPosts = React.memo((props) => {
  // componentDidMount() {
  //   setTimeout(() => {
  //     setState({ a: 12 });
  //   }, 3000);
  // }

  // shouldComponentUpdate(nextProps, nextState) {
  //   return nextProps !== props || nextState !== state;
  // }
  console.log("render");
  let postsElements = [...props.otherPosts]
    .reverse()
    .map((p) => <Post key={p.id} message={p.message} like={p.like} />);

  let newPostElement = React.createRef();

  let onAddPost = () => {
    props.addPost();
    // props.dispatch(addPostActionCreater());
  };

  let onPostChange = () => {
    let text = newPostElement.current.value;
    // props.dispatch({ type: "UPDATE-NEW-TEXT", text: text });
    props.updateNewPostText(text);
  };

  return (
    <div className={s.postsBlock}>
      <div>
        <div>
          <textarea
            ref={newPostElement}
            onChange={onPostChange}
            value={props.newPostText}
          />
        </div>
        <div>
          <button onClick={onAddPost}>Add post</button>
        </div>
        <div>
          <button>Remove</button>
        </div>
      </div>
      <div className={s.posts}>{postsElements}</div>
    </div>
  );
});

export default MyPosts;
