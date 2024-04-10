import MyPosts from "./MyPosts/MyPosts";
import s from "./Profile.module.css";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
const Profile = (props) => {
  debugger;
  return (
    <div>
      <ProfileInfo />
      <MyPosts
        otherPosts={props.profilePage.posts}
        dispatch={props.dispatch}
        newPostText={props.profilePage.newPostText}
      />
    </div>
  );
};

export default Profile;
