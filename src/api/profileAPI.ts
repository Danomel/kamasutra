import { ProfileType, PhotosType } from "../types/types";
import { APIResponseType, instance } from "./api";

type SavePhotoResponseDataType = {
  photos: PhotosType
}

export const profileAPI = {
  async getProfile(userId: number | null) {
    const res = await instance.get<ProfileType>(`profile/${userId}`);
    return res.data;
  },
  async getStatus(userId: number | null) {
    const res = await instance.get<string>(`profile/status/${userId}`);
    return res.data;
  },
  updateStatus(status: string | null) {
    return instance.put<APIResponseType>(`profile/status/`, {
      status: status,
    });
  },
  async savePhoto(photoFile: File) {
    const formData = new FormData();
    formData.append("image", photoFile);
    const res = await instance.put<APIResponseType<SavePhotoResponseDataType>>
    (`profile/photo/`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return res.data;
  },
  async saveProfile(profile: ProfileType) {
    const res = await instance.put<APIResponseType>(`profile/`, profile);
    return res.data;
  },
};
