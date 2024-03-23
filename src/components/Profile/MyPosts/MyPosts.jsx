import s from "./MyPosts.module.css";
import Post from "./Post/Post";
const MyPosts = () => {
  return (
    <div>
      My posts
      <div>
        <textarea></textarea>
        <button>Add post</button>
        <button>Remove</button>
      </div>
      <div className={s.posts}>
        <Post message="Hi, how are you?" like="15 Likes" />
        <Post message="It's my first post" like="20 Likes" />
      </div>
    </div>
  );
};

export default MyPosts;
