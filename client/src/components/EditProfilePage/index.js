import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { validateForm } from "../../utils";
import { NavBar } from "../global";
import { userAction } from "../../actions";
import { EditProfile } from "./presentations";

class EditProfilePage extends React.Component {
  state = {
    clientErrors: {},
    credentials: {
      password: "",
      newPassword: "",
      title: "",
      salary: "",
      desc: ""
    }
  };

  componentWillUnmount() {
    this.setState({
      credentials: {
        password: "",
        newPassword: "",
        title: "",
        salary: "",
        desc: ""
      }
    });
  }

  handleChange = e => {
    const { credentials } = this.state;
    const field = e.target.name;
    credentials[field] = e.target.value;
    this.setState({
      credentials
    });
  };

  handleSave = e => {
    e.preventDefault();
    const { credentials } = this.state;
    const { editProfile, user, history } = this.props;
    const clientErrors = validateForm.editProfile(credentials);
    this.setState({ clientErrors });
    if (Object.keys(clientErrors).length === 0) {
      const includeEmailCredentials = Object.assign({}, credentials, {
        email: user.email
      });
      editProfile(includeEmailCredentials);
      history.push("/my-profile");
    }
  };

  render() {
    const { user } = this.props;
    const { credentials, clientErrors } = this.state;
    return (
      <div className="edit-profile-container">
        <NavBar />
        <EditProfile
          user={user}
          credentials={credentials}
          clientErrors={clientErrors}
          handleChange={this.handleChange}
          handleSave={this.handleSave}
        />
      </div>
    );
  }
}
EditProfilePage.propTypes = {
  editProfile: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  user: PropTypes.object
};
const stateToProps = state => ({
  isUserAuthenticated: state.userReducer.isUserAuthenticated,
  user: state.userReducer.user
});
const dispatchToProps = dispatch => ({
  editProfile: credentials => {
    dispatch(userAction.editProfile(credentials));
  }
});

export default connect(
  stateToProps,
  dispatchToProps
)(EditProfilePage);
