import s from "./Profile.module.css";
const Profile = () => {
  return (
    <div className={s.content}>
      <div>
        <img
          alt="cock"
          src="https://purepng.com/public/uploads/large/nature-yuh.png"
        />
      </div>
      <div>ava + description</div>
      <div>
        My posts
        <div>New post</div>
        <div className={s.posts}>
          <div className={s.item}>post1</div>
          <div className={s.item}>post2</div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
