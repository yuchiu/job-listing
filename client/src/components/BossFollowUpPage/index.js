import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";

import { userAction } from "../../actions";
import { InfoNav, InlineError } from "../global";
import { auth } from "../../utils";
import { FollowUpForm } from "./presentations";

class BossFollowUpPage extends React.Component {
  state = {
    clientErrors: {},
    followUpCredentials: {
      title: "",
      company: "",
      salary: "",
      desc: "",
      avatar: ""
    }
  };

  componentWillUnmount() {
    this.setState({
      followUpCredentials: {
        title: "",
        company: "",
        salary: "",
        desc: "",
        avatar: ""
      }
    });
  }

  handleChange = e => {
    const { followUpCredentials } = this.state;
    const field = e.target.name;
    followUpCredentials[field] = e.target.value;

    this.setState({
      followUpCredentials
    });
  };

  selectAvatar = avatar => {
    this.setState({
      followUpCredentials: {
        avatar
      }
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const userId = auth.getUserId();
    const { followUpCredentials } = this.state;
    const { followupUserInfo } = this.props;
    followupUserInfo(followUpCredentials, userId);
  };

  render() {
    const username = auth.getUsername();
    const { followUpCredentials } = this.state;
    const {
      isUserAuthenticated,
      message,
      user,
      location: { pathname }
    } = this.props;
    return (
      <div>
        {!isUserAuthenticated && <Redirect to="/login" />}
        {isUserAuthenticated && user.avatar && <Redirect to="/browse" />}
        <InfoNav
          name={username}
          text=" You are one step closer! Please complete the follow up info."
        />
        <FollowUpForm
          selectAvatar={this.selectAvatar}
          handleChange={this.handleChange}
          followUpCredentials={followUpCredentials}
          handleSubmit={this.handleSubmit}
        />
        <br />
        {message && <InlineError text={message} />}
      </div>
    );
  }
}
BossFollowUpPage.propTypes = {
  followupUserInfo: PropTypes.func.isRequired,
  user: PropTypes.object,
  isUserAuthenticated: PropTypes.bool.isRequired,
  message: PropTypes.string.isRequired,
  location: PropTypes.object.isRequired
};
const stateToProps = state => ({
  isUserAuthenticated: state.userReducer.isUserAuthenticated,
  user: state.userReducer.user,
  message: state.userReducer.message
});
const dispatchToProps = dispatch => ({
  followupUserInfo: (followUpCredentials, userId) => {
    dispatch(userAction.followupUserInfo(followUpCredentials, userId));
  }
});

export default connect(
  stateToProps,
  dispatchToProps
)(BossFollowUpPage);
