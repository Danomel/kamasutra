import { actions } from "../../redux/dialogs-reducer";
import Dialogs from "./Dialogs";
import { connect } from "react-redux";
import { withAuthRedirect } from "../../hoc/WithAuthRedirect";
import { compose } from "redux";
import { AppStateType } from "../../redux/redux-store";
// import { DialogsPageType } from "../../types/types";
import { InitialStateType } from "../../redux/dialogs-reducer";
type MapStatePropsType = {
  dialogsPage: InitialStateType;
};
let mapStateToProps = (state: AppStateType): MapStatePropsType => {
  return {
    dialogsPage: state.dialogsPage,
  };
};

export default compose<React.ComponentType>(
  connect(mapStateToProps, { ...actions }),
  withAuthRedirect
)(Dialogs);
