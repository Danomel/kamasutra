import { profileAPI } from "../api/profileAPI.ts";
import { PostType, ProfileType, PhotosType } from "../types/types";
import { BaseThunkType, InferActionsTypes } from "./redux-store.ts";

const initialState = {
  posts: [
    {
      id: 1,
      message: "Hi, how are you?",
      like: 20,
    },
    {
      id: 2,
      message: "It's my first post",
      like: 15,
    },
  ] as Array<PostType>,
  profile: null as ProfileType | null,
  status: "",
};
// const profileReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case ADD_POST:
//       let newPost = {
//         id: 5,
//         message: state.newPostText,
//         like: 0,
//       };
//       state.posts.push(newPost);
//       state.newPostText = "";
//       return state;
//     case UPDATE_NEW_POST_TEXT:
//       state.newPostText = action.text;
//       return state;
//     default:
//       return state;
//   }

// const profileReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case ADD_POST:
//       let newPost = {
//         id: 5,
//         message: state.newPostText,
//         like: 0,
//       };
//       // state.posts.push(newPost);
//       // state.newPostText = "";
//       return { ...state, posts: [...state.posts, newPost], newPostText: "" };
//     case UPDATE_NEW_POST_TEXT:
//       // state.newPostText = action.text;
//       console.log(state.newPostText);
//       return { ...state, newPostText: action.text };
//     default:
//       return state;
//   }

const profileReducer = (
  state = initialState,
  action: ActionsTypes
): initialStateType => {
  switch (action.type) {
    case "SN/PROFILE/ADD-POST": {
      let newPost = {
        id: 5,
        message: action.newPostText,
        like: 0,
      };
      return {
        ...state,
        posts: [...state.posts, newPost],
      };
      // let stateCopy = { ...state };
      // stateCopy.posts = [...state.posts];
      // stateCopy.posts.push(newPost);
      // stateCopy.newPostText = "";
      // return stateCopy;
    }
    case "SN/PROFILE/SET_USER_PROFILE": {
      return { ...state, profile: action.profile };
    }
    case "SN/PROFILE/SET_STATUS": {
      return { ...state, status: action.status };
    }
    case "SN/PROFILE/DELETE_POST":
      return {
        ...state,
        posts: state.posts.filter((p) => p.id !== action.postId),
      };
    case "SN/PROFILE/SAVE_PHOTO_SUCCESS":
      return {
        ...state,
        profile: { ...state.profile, photos: action.photos } as ProfileType,
      };
    default:
      return state;
  }

  // if (action.type === ADD_POST) {
  //   let newPost = {
  //     id: 5,
  //     message: state.newPostText,
  //     like: 0,
  //   };
  // state.posts.push(newPost);
  // state.newPostText = "";
  // return state;
  // } else if (action.type === UPDATE_NEW_POST_TEXT) {
  // state.newPostText = action.text;
  // return state;
  // } else {
  //   return state;
  // }
};

export const actions = {
  addPostActionCreater: (newPostText: string) =>
    ({
      type: "SN/PROFILE/ADD-POST",
      newPostText,
    } as const),
  setUserProfile: (profile: ProfileType) =>
    ({
      type: "SN/PROFILE/SET_USER_PROFILE",
      profile,
    } as const),
  setStatus: (status: string) =>
    ({
      type: "SN/PROFILE/SET_STATUS",
      status,
    } as const),
  deletePost: (postId: number) =>
    ({
      type: "SN/PROFILE/DELETE_POST",
      postId,
    } as const),
  savePhotoSuccess: (photos: PhotosType) =>
    ({
      type: "SN/PROFILE/SAVE_PHOTO_SUCCESS",
      photos,
    } as const),
};

type ThunkType = BaseThunkType<ActionsTypes>;

export const getUserProfile =
  (userId: number | null): ThunkType =>
  async (dispatch) => {
    const data = await profileAPI.getProfile(userId);
    dispatch(actions.setUserProfile(data));
  };

export const getStatus =
  (userId: number): ThunkType =>
  async (dispatch) => {
    const status = await profileAPI.getStatus(userId);
    dispatch(actions.setStatus(status));
  };

export const updateStatus =
  (status: string): ThunkType =>
  async (dispatch) => {
    const response = await profileAPI.updateStatus(status);
    if (response.data.resultCode === 0) {
      dispatch(actions.setStatus(status));
    }
  };

export const savePhoto =
  (file: File): ThunkType =>
  async (dispatch) => {
    const data = await profileAPI.savePhoto(file);
    if (data.resultCode === 0) {
      dispatch(actions.savePhotoSuccess(data.data.photos));
    }
  };
export const saveProfile =
  (profile: ProfileType, setStatus: (status: any) => void): ThunkType =>
  async (dispatch, getState) => {
    const userId = getState().auth.userId;
    const data = await profileAPI.saveProfile(profile);
    if (data.resultCode === 0) {
      dispatch(getUserProfile(userId));
    } else {
      setStatus({ error: data.messages });
      return Promise.reject(data.messages);
    }
  };
export default profileReducer;

type initialStateType = typeof initialState;
type ActionsTypes = InferActionsTypes<typeof actions>;
