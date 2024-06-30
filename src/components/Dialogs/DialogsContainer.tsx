import { actions } from "../../redux/dialogs-reducer.ts";
import Dialogs from "./Dialogs.tsx";
import { connect } from "react-redux";
import { withAuthRedirect } from "../../hoc/WithAuthRedirect.js";
import { compose } from "redux";
import { AppStateType } from "../../redux/redux-store.ts";
import { DialogsPageType } from "../../types/types.ts";

type MapStatePropsType = {
  dialogsPage: DialogsPageType;
};

type MapDispatchPropsType = {
  onSendMessageClick: (newMessageBody: string) => void;
};

let mapDispatchToProps = (dispatch: any): MapDispatchPropsType => {
  return {
    onSendMessageClick: (newMessageBody: string) => {
      dispatch(actions.sendMessageCreater(newMessageBody));
    },
  };
};

let mapStateToProps = (state: AppStateType): MapStatePropsType => {
  return {
    dialogsPage: state.dialogsPage,
  };
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withAuthRedirect
)(Dialogs);
