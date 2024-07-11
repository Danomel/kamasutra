import { GetItemsType, APIResponseType, instance } from "./api";

export const usersAPI = {
  async requestUsers(page = 1, pageSize = 10, term: string = "", friend: null | boolean = null) {
    const res = await instance.get<GetItemsType>(`users?page=${page}&count=${pageSize}&term=${term}` 
      + (friend === null ? '' : `&friend=${friend}`));
    return res.data;
  },

  async follow(userId: number) {
    const res = await instance.post<APIResponseType>(`follow/${userId}`);
    return res.data;
  },

  unfollow(userId: number) {
    return instance.delete(`follow/${userId}`).then(res => res.data) as Promise<APIResponseType>;
  },
};