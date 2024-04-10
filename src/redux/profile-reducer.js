const UPDATE_NEW_POST_TEXT = "UPDATE-NEW-POST-TEXT";
const ADD_POST = "ADD-POST";

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
};

// const profileReducer = (state = initialState, action) => {
//   debugger;
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

const profileReducer = (state = initialState, action) => {
  debugger;
  switch (action.type) {
    case ADD_POST:
      let newPost = {
        id: 5,
        message: state.newPostText,
        like: 0,
      };
      // state.posts.push(newPost);
      // state.newPostText = "";
      return { ...state, posts: [...state.posts, newPost], newPostText: "" };
    case UPDATE_NEW_POST_TEXT:
      // state.newPostText = action.text;
      return { ...state, newPostText: action.text };
    default:
      return state;
  }

  // if (action.type === ADD_POST) {
  //   let newPost = {
  //     id: 5,
  //     message: state.newPostText,
  //     like: 0,
  //   };
  //   state.posts.push(newPost);
  //   state.newPostText = "";
  //   return state;
  // } else if (action.type === UPDATE_NEW_POST_TEXT) {
  //   state.newPostText = action.text;
  //   return state;
  // } else {
  //   return state;
  // }
};
export const addPostActionCreater = () => ({
  type: ADD_POST,
});

export const updateNewPostTextActionCreaater = (text) => ({
  type: UPDATE_NEW_POST_TEXT,
  text: text,
});
export default profileReducer;
