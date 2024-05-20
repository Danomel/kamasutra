import { profileAPI, usersAPI } from "../api/api";

const UPDATE_NEW_POST_TEXT = "UPDATE-NEW-POST-TEXT";
const ADD_POST = "ADD-POST";
const SET_USER_PROFILE = "SET_USER_PROFILE";
const SET_STATUS = "SET_STATUS";

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
  ],
  newPostText: "it-kamasutra.com",
  profile: null,
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

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_POST: {
      let newPost = {
        id: 5,
        message: state.newPostText,
        like: 0,
      };
      let stateCopy = { ...state };
      stateCopy.posts = [...state.posts];
      stateCopy.posts.push(newPost);
      stateCopy.newPostText = "";
      return stateCopy;
    }
    case UPDATE_NEW_POST_TEXT: {
      let stateCopy = { ...state };
      stateCopy.newPostText = action.text;
      return stateCopy;
    }
    case SET_USER_PROFILE: {
      return { ...state, profile: action.profile };
    }
    case SET_STATUS: {
      return { ...state, status: action.status };
    }
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
export const addPostActionCreater = () => ({
  type: ADD_POST,
});

export const updateNewPostTextActionCreater = (text) => ({
  type: UPDATE_NEW_POST_TEXT,
  text: text,
});
export const setUserProfile = (profile) => ({
  type: SET_USER_PROFILE,
  profile,
});

export const setStatus = (status) => ({
  type: SET_STATUS,
  status,
});

export const getUserProfile = (userId) => {
  return (dispatch) => {
    usersAPI.getProfile(userId).then((response) => {
      dispatch(setUserProfile(response.data));
    });
  };
};

export const getStatus = (userId) => (dispatch) => {
  profileAPI.getStatus(userId).then((response) => {
    dispatch(setStatus(response.data));
  });
};

export const updateStatus = (status) => (dispatch) => {
  profileAPI.updateStatus(status).then((response) => {
    if (response.data.resultCode === 0) {
      dispatch(setStatus(status));
    }
  });
};
export default profileReducer;
