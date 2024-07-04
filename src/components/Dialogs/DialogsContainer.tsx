import { actions } from "../../redux/dialogs-reducer.ts";
import Dialogs from "./Dialogs.tsx";
import { connect } from "react-redux";
import { withAuthRedirect } from "../../hoc/WithAuthRedirect.tsx";
import { compose } from "redux";
import { AppStateType } from "../../redux/redux-store.ts";
// import { DialogsPageType } from "../../types/types.ts";
import { InitialStateType } from "../../redux/dialogs-reducer.ts";
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
