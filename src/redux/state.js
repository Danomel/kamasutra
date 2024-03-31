import { reRenderEntireTree } from "../render";

let state = {
  profilePage: {
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
  },
  dialogsPage: {
    messages: [
      {
        id: 1,
        message: "Hi",
      },
      {
        id: 2,
        message: "How is your it-kamasutra",
      },
      {
        id: 3,
        message: "Yo",
      },
      {
        id: 4,
        message: "Yo",
      },
      {
        id: 5,
        message: "Yo",
      },
    ],
    dialogs: [
      {
        id: 1,
        name: "Dimych",
      },
      {
        id: 2,
        name: "Andrew",
      },
      {
        id: 3,
        name: "Sveta",
      },
      {
        id: 4,
        name: "Sasha",
      },
      {
        id: 5,
        name: "Viktor",
      },
      {
        id: 6,
        name: "Valera",
      },
    ],
  },
};

export let addPost = () => {
  let newPost = {
    id: 5,
    message: state.profilePage.newPostText,
    like: 0,
  };
  state.profilePage.posts.push(newPost);
  state.profilePage.newPostText = "";
  reRenderEntireTree(state);
};

export let updateNewPostText = (newText) => {
  state.profilePage.newPostText = newText;
  reRenderEntireTree(state);
};

export default state;
