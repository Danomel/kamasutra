import MyPosts from "./MyPosts";
import {
  addPostActionCreater,
  updateNewPostTextActionCreater,
} from "../../../redux/profile-reducer";
import { connect } from "react-redux";

let mapDispatchToProps = (dispatch) => {
  return {
    updateNewPostText: (text) => {
      let action = updateNewPostTextActionCreater(text);
      dispatch(action);
    },
    addPost: () => {
      dispatch(addPostActionCreater());
    },
  };
};

let mapStateToProps = (state) => {
  return {
    otherPosts: state.profilePage.posts,
    newPostText: state.profilePage.newPostText,
  };
};

const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts);

export default MyPostsContainer;

// // const MyPostsContainer = (props) => {
//   // return (
//     <StoreContext.Consumer>
//       {(store) => {
//         let state = store.getState();
//         let addPost = () => {
//           store.dispatch(addPostActionCreater());
//         };

//         let onPostChange = (text) => {
//           let action = updateNewPostTextActionCreater(text);
//           store.dispatch(action);
//         };
//         return (
//           <MyPosts
//             updateNewPostText={onPostChange}
//             addPost={addPost}
//             otherPosts={state.profilePage.posts}
//             newPostText={state.profilePage.newPostText}
//           />
//         );
//       }}
//     </StoreContext.Consumer>
//   );
// };
