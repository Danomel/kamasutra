import { instance } from "./api";

type getCaptchaUrlResponseType = {
  url: string
}

export const securityAPI = {
  async getCaptchaUrl() {
    const res = await instance.get<getCaptchaUrlResponseType>(`security/get-captcha-url`);
    return res.data;
  },
};
