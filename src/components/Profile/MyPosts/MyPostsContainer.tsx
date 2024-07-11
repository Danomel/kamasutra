import MyPosts, { DispatchPropsType, MapPropsType } from "./MyPosts";
import { actions } from "../../../redux/profile-reducer";
import { connect } from "react-redux";
import { AppStateType } from "../../../redux/redux-store";

let mapStateToProps = (state: AppStateType) => {
  return {
    otherPosts: state.profilePage.posts,
  };
};

const MyPostsContainer = connect<
  MapPropsType,
  DispatchPropsType,
  {},
  AppStateType
>(mapStateToProps, {
  addPost: actions.addPostActionCreater,
})(MyPosts);

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
