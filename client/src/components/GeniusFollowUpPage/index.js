import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";

import { userAction } from "../../actions";
import { InfoNav, InlineError } from "../global";
import { auth } from "../../utils";
import { FollowUpForm } from "./presentations";

class GeniusFollowUpPage extends React.Component {
  state = {
    clientErrors: {},
    credentialFollowUp: {
      title: "",
      desc: "",
      avatar: ""
    }
  };

  componentWillUnmount() {
    this.setState({
      credentialFollowUp: {
        title: "",
        desc: "",
        avatar: ""
      }
    });
  }

  handleChange = e => {
    const { credentialFollowUp } = this.state;
    const field = e.target.name;
    credentialFollowUp[field] = e.target.value;

    this.setState({
      credentialFollowUp
    });
  };

  selectAvatar = avatar => {
    this.setState({
      credentialFollowUp: {
        avatar
      }
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const userId = auth.getUserId();
    const { credentialFollowUp } = this.state;
    const { followupUserInfo } = this.props;
    followupUserInfo(credentialFollowUp, userId);
  };

  render() {
    const username = auth.getUsername();
    const isUserAuthenticated = auth.isUserAuthenticated();
    const { credentialFollowUp } = this.state;
    const {
      redirectTo,
      message,
      location: { pathname }
    } = this.props;
    return (
      <div>
        {!isUserAuthenticated && <Redirect to="/login" />}
        {redirectTo && redirectTo !== pathname ? (
          <Redirect to={redirectTo} />
        ) : null}
        <InfoNav
          name={username}
          text=" You are one step closer! Please complete the follow up info."
        />
        <FollowUpForm
          selectAvatar={this.selectAvatar}
          handleChange={this.handleChange}
          credentialFollowUp={credentialFollowUp}
          handleSubmit={this.handleSubmit}
        />
        <br />
        {message && <InlineError text={message} />}
      </div>
    );
  }
}
GeniusFollowUpPage.propTypes = {
  followupUserInfo: PropTypes.func.isRequired,
  redirectTo: PropTypes.string,
  message: PropTypes.string.isRequired,
  location: PropTypes.object.isRequired
};
const stateToProps = state => ({
  redirectTo: state.userReducer.redirectTo,
  message: state.userReducer.message
});
const dispatchToProps = dispatch => ({
  followupUserInfo: (credentialFollowUp, userId) => {
    dispatch(userAction.followupUserInfo(credentialFollowUp, userId));
  }
});

export default connect(
  stateToProps,
  dispatchToProps
)(GeniusFollowUpPage);
