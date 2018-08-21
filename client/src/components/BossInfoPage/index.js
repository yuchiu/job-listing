import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { userAction } from "../../actions";
import { InfoNav } from "../global";
import { FollowUpForm } from "./presentation";

class BossInfoPage extends React.Component {
  state = {
    clientErrors: {},
    credentialFollowUp: {
      title: "",
      company: "",
      salary: "",
      desc: "",
      avatar: ""
    }
  };

  componentWillUnmount() {
    this.setState({
      credentialFollowUp: {
        title: "",
        company: "",
        salary: "",
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
    const { credentialFollowUp } = this.state;
    const { followupUserInfo, user } = this.props;
    followupUserInfo(credentialFollowUp, user);
  };

  render() {
    const { user } = this.props;
    const { credentialFollowUp } = this.state;
    return (
      <div>
        <InfoNav
          name={user.username}
          text=" You are one step closer! Please complete the follow up info."
        />
        <FollowUpForm
          selectAvatar={this.selectAvatar}
          handleChange={this.handleChange}
          credentialFollowUp={credentialFollowUp}
          handleSubmit={this.handleSubmit}
        />
      </div>
    );
  }
}
BossInfoPage.propTypes = {
  user: PropTypes.object.isRequired,
  followupUserInfo: PropTypes.func.isRequired
};
const stateToProps = state => ({
  user: state.authReducer.user
});
const dispatchToProps = dispatch => ({
  followupUserInfo: (credentialFollowUp, user) => {
    dispatch(userAction.followupUserInfo(credentialFollowUp, user));
  }
});

export default connect(
  stateToProps,
  dispatchToProps
)(BossInfoPage);
