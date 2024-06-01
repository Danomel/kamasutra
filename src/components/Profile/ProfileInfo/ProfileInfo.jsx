import Preloader from "../../../common/preloader/preloader";
import s from "./ProfileInfo.module.css";
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";
const ProfileInfo = ({ profile, status, updateStatus }) => {
  if (!profile) {
    return <Preloader />;
  }
  return (
    <div>
      {/* <div>
        <img
          alt="cock"
          src="https://purepng.com/public/uploads/large/nature-yuh.png"
          width="100%"
        />
      </div> */}
      <div className={s.descriptionBlock}>
        <img alt="" src={profile.photos.large} />
        <ProfileStatusWithHooks status={status} updateStatus={updateStatus} />
      </div>
    </div>
  );
};

export default ProfileInfo;
