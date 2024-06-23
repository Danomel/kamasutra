import { profileAPI, usersAPI } from "../api/api";
import { PostType, ProfileType, photosType } from "../types/types";

const ADD_POST = "ADD-POST";
const SET_USER_PROFILE = "SET_USER_PROFILE";
const SET_STATUS = "SET_STATUS";
const DELETE_POST = "DELETE_POST";
const SAVE_PHOTO_SUCCESS = "SAVE_PHOTO_SUCCESS";


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
type initialStateType = typeof initialState;

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

const profileReducer = (state = initialState, action: any): initialStateType => {
  switch (action.type) {
    case ADD_POST: {
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
    case SET_USER_PROFILE: {
      return { ...state, profile: action.profile };
    }
    case SET_STATUS: {
      return { ...state, status: action.status };
    }
    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter((p) => p.id !== action.postId),
      };
    case SAVE_PHOTO_SUCCESS:
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

type AddPostActionCreaterActionType = {
  type: typeof ADD_POST,
  newPostText: string
}
export const addPostActionCreater = (newPostText: string): AddPostActionCreaterActionType => ({
  type: ADD_POST,
  newPostText
});

type SetUserProfileActionType = {
  type: typeof SET_USER_PROFILE,
  profile: ProfileType
}

export const setUserProfile = (profile: ProfileType): SetUserProfileActionType => ({
  type: SET_USER_PROFILE,
  profile,
});

type SetStatusActionType = {
  type: typeof SET_STATUS,
  status: string
}

export const setStatus = (status: string): SetStatusActionType => ({
  type: SET_STATUS,
  status,
});

type DeletePostActionType = {
  type: typeof DELETE_POST,
  postId: number
}

export const deletePost = (postId: number): DeletePostActionType => ({
  type: DELETE_POST,
  postId,
});

type SavePhotoSuccessActionType = {
  type: typeof SAVE_PHOTO_SUCCESS,
  photos: photosType
}
export const savePhotoSuccess = (photos: photosType): SavePhotoSuccessActionType => ({
  type: SAVE_PHOTO_SUCCESS,
  photos,
});

export const getUserProfile = (userId: number) => async (dispatch: any) => {
  const response = await usersAPI.getProfile(userId);
  dispatch(setUserProfile(response.data));
};

export const getStatus = (userId: number) => async (dispatch: any) => {
  const response = await profileAPI.getStatus(userId);
  dispatch(setStatus(response.data));
};

export const updateStatus = (status: string) => async (dispatch: any) => {
  const response = await profileAPI.updateStatus(status);
  debugger;
  if (response.data.resultCode === 0) {
    dispatch(setStatus(status));
  }
};

export const savePhoto = (file: any) => async (dispatch: any) => {
  const response = await profileAPI.savePhoto(file);
  if (response.data.resultCode === 0) {
    dispatch(savePhotoSuccess(response.data.data.photos));
  }
};
export const saveProfile =
  (profile: ProfileType, setStatus: any) => async (dispatch: any, getState: any) => {
    const userId = getState().auth.userId;
    const response = await profileAPI.saveProfile(profile);
    if (response.data.resultCode === 0) {
      dispatch(getUserProfile(userId));
    } else {
      setStatus({ error: response.data.messages });
      return Promise.reject(response.data.messages);
    }
  };
export default profileReducer;
