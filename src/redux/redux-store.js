import { combineReducers, configureStore } from "@reduxjs/toolkit";
import profileReducer from "./profile-reducer";
import dialogsReducer from "./dialogs-reducer";
import sidebarReducer from "./sidebar-reducer";
import UsersReducer from "./users-reducer";
import authReducer from "./auth-reducer";

let rootReducer = combineReducers({
  profilePage: profileReducer,
  dialogsPage: dialogsReducer,
  sidebar: sidebarReducer,
  usersPage: UsersReducer,
  auth: authReducer,
});
let store = configureStore({ reducer: rootReducer });
window.store = store;

export default store;
