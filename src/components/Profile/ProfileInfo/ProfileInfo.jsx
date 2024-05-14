import Preloader from "../../../common/preloader/preloader";
import s from "./ProfileInfo.module.css";
const ProfileInfo = (props) => {
  if (!props.profile) {
    return <Preloader />;
  }
  return (
    <div>
      <div>
        <img
          alt="cock"
          src="https://purepng.com/public/uploads/large/nature-yuh.png"
          width="100%"
        />
      </div>
      <div className={s.descriptionBlock}>
        <img alt="" src={props.profile.photos.large} />
        ava + description
      </div>
    </div>
  );
};

export default ProfileInfo;
