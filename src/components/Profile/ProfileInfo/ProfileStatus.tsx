import React, { ChangeEvent } from "react";

type PropsType = {
  status: string;
  updateStatus: (newStatus: string) => void;
};
type stateType = {
  editMode: boolean;
  status: string;
};

class ProfileStatus extends React.Component<PropsType, stateType> {
  state = {
    editMode: false,
    status: this.props.status,
  };
  activateEditMode = () => {
    this.setState({
      editMode: true,
    });
  };
  deactivateEditMode = () => {
    this.setState({
      editMode: false,
    });
    this.props.updateStatus(this.state.status);
  };
  onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState({
      status: e.currentTarget.value,
    });
  };
  componentDidUpdate(prevProps: PropsType, prevState: stateType) {
    prevProps.status !== this.props.status &&
      this.setState({
        status: this.props.status,
      });
  }
  render() {
    return (
      <div>
        {!this.state.editMode && (
          <div>
            <span role="status" onDoubleClick={this.activateEditMode}>
              {this.props.status || "----"}
            </span>
          </div>
        )}
        {this.state.editMode && (
          <div>
            <input
              // eslint-disable-next-line jsx-a11y/aria-role
              role="input"
              onChange={this.onStatusChange}
              autoFocus={true}
              onBlur={this.deactivateEditMode}
              value={this.state.status}
            />
          </div>
        )}
      </div>
    );
  }
}
export default ProfileStatus;
