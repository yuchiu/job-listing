import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { validateForm } from "../../utils";
import { NavBar } from "../global";
import { userAction } from "../../actions";
import { Profile, EditProfile } from "./presentations";

class MyProfilePage extends React.Component {
  state = {
    clientErrors: {},
    credentials: {
      password: "",
      newPassword: "",
      title: "",
      company: "",
      salary: "",
      desc: ""
    },
    editProfile: false
  };

  componentWillUnmount() {
    this.setState({
      credentials: {
        password: "",
        newPassword: "",
        title: "",
        company: "",
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
    const { editProfile, user } = this.props;
    const clientErrors = validateForm.editProfile(credentials);
    this.setState({ clientErrors });
    if (Object.keys(clientErrors).length === 0) {
      const includeEmailCredentials = Object.assign({}, credentials, {
        email: user.email
      });
      editProfile(includeEmailCredentials);
      this.toggleEdit();
    }
  };

  toggleEdit = () => {
    const { editProfile } = this.state;
    this.setState({ editProfile: !editProfile });
  };

  render() {
    const { user } = this.props;
    const { editProfile, credentials, clientErrors } = this.state;
    return (
      <div className="user-container">
        <NavBar />
        {editProfile ? (
          <EditProfile
            user={user}
            credentials={credentials}
            clientErrors={clientErrors}
            handleChange={this.handleChange}
            handleSave={this.handleSave}
          />
        ) : (
          <Profile user={user} toggleEdit={this.toggleEdit} />
        )}
      </div>
    );
  }
}
MyProfilePage.propTypes = {
  editProfile: PropTypes.func.isRequired,
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
)(MyProfilePage);
