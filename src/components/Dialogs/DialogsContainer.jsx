import { Navigate } from "react-router-dom";
import {
  sendMessageCreater,
  updateNewMessageBodyCreater,
} from "../../redux/dialogs-reducer";
import Dialogs from "./Dialogs";
import { connect } from "react-redux";
import { withAuthRedirect } from "../../hoc/WithAuthRedirect";

let mapDispatchToProps = (dispatch) => {
  return {
    onNewMessageChange: (body) => {
      dispatch(updateNewMessageBodyCreater(body));
    },
    onSendMessageClick: () => {
      dispatch(sendMessageCreater());
    },
  };
};

let mapStateToProps = (state) => {
  return {
    dialogsPage: state.dialogsPage,
  };
};

let AuthRedirectComponent = withAuthRedirect(Dialogs);

const DialogsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(AuthRedirectComponent);

export default DialogsContainer;
