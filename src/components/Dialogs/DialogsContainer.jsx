import { sendMessageCreater } from "../../redux/dialogs-reducer.ts";
import Dialogs from "./Dialogs";
import { connect } from "react-redux";
import { withAuthRedirect } from "../../hoc/WithAuthRedirect";
import { compose } from "redux";

let mapDispatchToProps = (dispatch) => {
  return {
    onSendMessageClick: (newMessageBody) => {
      dispatch(sendMessageCreater(newMessageBody));
    },
  };
};

let mapStateToProps = (state) => {
  return {
    dialogsPage: state.dialogsPage,
  };
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withAuthRedirect
)(Dialogs);
