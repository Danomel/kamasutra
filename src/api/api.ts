import axios from "axios";
import { ProfileType } from "../types/types";

const instance = axios.create({
  withCredentials: true,
  baseURL: `https://social-network.samuraijs.com/api/1.0/`,
  headers: { "API-KEY": "0e152062-aa2b-4b2f-a212-65775f9b0b5b" },
});

export const usersAPI = {
  async requestUsers(page = 1, pageSize = 10) {
    const response = await instance.get(`users?page=${page}&count=${pageSize}`);
    return response.data;
  },

  follow(userId: number) {
    return instance.post(`follow/${userId}`);
  },

  unfollow(userId: number) {
    return instance.delete(`follow/${userId}`);
  },
  getProfile(userId: number) {
    console.warn("Obsolete method. Please profileAPI object. ");
    return profileAPI.getProfile(userId);
  },
};

export const profileAPI = {
  getProfile(userId: number) {
    return instance.get(`profile/${userId}`);
  },
  getStatus(userId: number) {
    return instance.get(`profile/status/${userId}`);
  },
  updateStatus(status: string) {
    return instance.put(`profile/status/`, {
      status: status,
    });
  },
  savePhoto(photoFile: any) {
    const formData = new FormData();
    formData.append("image", photoFile);
    return instance.put(`profile/photo/`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },
  saveProfile(profile: ProfileType) {
    return instance.put(`profile/`, profile);
  },
};

export enum ResultCodesEnum {
  Success = 0,
  Error = 1,
}

export enum ResultCodeForCaptcha {
  CaptchaIsRequired = 10 
}

type MeResponseType = {
  data: {id: number, email: string, login: string};
  resultCode: ResultCodesEnum;
  messages: Array<string>
}

type LoginResponseType = {
  data: {userId: number };
  resultCode: ResultCodesEnum & ResultCodeForCaptcha;
  messages: Array<string>
}

export const authAPI = {
  async me() {
    const res = await instance.get<MeResponseType>(`auth/me`);
    return res.data;
  },
  async login(email: string, password: string, rememberMe = false, captcha: null | string = null ) {
    const res = await instance.post<LoginResponseType>(`auth/login`, {
      email,
      password,
      rememberMe,
      captcha,
    });
    return res.data
  },
  async logout() {
    const res = await instance.delete(`auth/login`);
    return res.data;
  },
};

export const securityAPI = {
  getCaptchaUrl() {
    return instance.get(`security/get-captcha-url`);
  },
};
