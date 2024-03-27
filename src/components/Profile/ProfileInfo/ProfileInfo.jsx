import s from "./ProfileInfo.module.css";
const ProfileInfo = () => {
  return (
    <div>
      <div>
        <img
          alt="cock"
          src="https://purepng.com/public/uploads/large/nature-yuh.png"
          width="100%"
        />
      </div>
      <div className={s.descriptionBlock}>ava + description</div>
    </div>
  );
};

export default ProfileInfo;
