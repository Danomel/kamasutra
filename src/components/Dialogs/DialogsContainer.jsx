import {
  sendMessageCreater,
  updateNewMessageBodyCreater,
} from "../../redux/dialogs-reducer";
import Dialogs from "./Dialogs";
import { connect } from "react-redux";

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

const DialogsContainer = connect(mapStateToProps, mapDispatchToProps)(Dialogs);

export default DialogsContainer;
