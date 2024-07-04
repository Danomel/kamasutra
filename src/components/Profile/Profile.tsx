import React from "react";
import MyPostsContainer from "./MyPosts/MyPostsContainer.tsx";
import ProfileInfo, { ProfileValuesType } from "./ProfileInfo/ProfileInfo.tsx";
import { ProfileType } from "../../types/types.ts";

type PropsType = {
  profile: ProfileType | null;
  status: string;
  updateStatus: (newStatus: string) => void;
  isOwner: boolean;
  savePhoto: (file: File) => void;
  saveProfile: (values: ProfileValuesType, status: string) => void;
};
const Profile: React.FC<PropsType> = (props) => {
  return (
    <div>
      <ProfileInfo
        isOwner={props.isOwner}
        profile={props.profile}
        status={props.status}
        updateStatus={props.updateStatus}
        savePhoto={props.savePhoto}
        saveProfile={props.saveProfile}
      />
      <MyPostsContainer />
    </div>
  );
};

export default Profile;
