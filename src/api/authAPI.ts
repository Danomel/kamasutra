import { APIResponseType, ResultCodeForCaptchaEnum, ResultCodesEnum } from "./api.ts";
import { instance } from "./api.ts";

export type MeResponseDataType = {id: number; email: string; login: string};
export type LoginResponseDataType = {userId: number};

export const authAPI = {
  async me() {
    const res = await instance.get<APIResponseType<MeResponseDataType>>(`auth/me`);
    return res.data;
  },
  async login(email: string, password: string, rememberMe = false, captcha: null | string = null) {
    const res = await instance.post<APIResponseType<LoginResponseDataType, ResultCodesEnum | ResultCodeForCaptchaEnum>>(`auth/login`, {
      email,
      password,
      rememberMe,
      captcha,
    });
    return res.data;
  },
  async logout() {
    const res = await instance.delete(`auth/login`);
    return res.data;
  },
};


