import MyPosts from "./MyPosts/MyPosts";
import s from "./Profile.module.css";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
const Profile = (props) => {
  return (
    <div>
      <ProfileInfo />
      <MyPosts otherPosts={props.state.posts} addPost={props.addPost} />
    </div>
  );
};

export default Profile;
