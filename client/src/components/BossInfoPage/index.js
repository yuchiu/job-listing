import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { InfoNav } from "../global";
import { FollowUpForm } from "./presentation";

class BossInfoPage extends React.Component {
  state = {
    clientErrors: {},
    userFollowUpInfo: {
      title: "",
      company: "",
      salary: "",
      desc: "",
      avatar: ""
    }
  };

  componentWillUnmount() {
    this.setState({
      userFollowUpInfo: {
        title: "",
        company: "",
        salary: "",
        desc: "",
        avatar: ""
      }
    });
  }

  handleChange = e => {
    const { userFollowUpInfo } = this.state;
    const field = e.target.name;
    userFollowUpInfo[field] = e.target.value;

    this.setState({
      userFollowUpInfo
    });
  };

  selectAvatar = avatar => {
    this.setState({
      userFollowUpInfo: {
        avatar
      }
    });
  };

  render() {
    const { user } = this.props;
    const { userFollowUpInfo } = this.state;
    return (
      <div>
        <InfoNav
          name={user.username}
          text=" You are one step closer! Please complete the follow up info."
        />
        <FollowUpForm
          selectAvatar={this.selectAvatar}
          handleChange={this.handleChange}
          userFollowUpInfo={userFollowUpInfo}
        />
      </div>
    );
  }
}
BossInfoPage.propTypes = {
  user: PropTypes.object.isRequired
};
const stateToProps = state => ({
  user: state.authReducer.user
});
const dispatchToProps = () => ({});

export default connect(
  stateToProps,
  dispatchToProps
)(BossInfoPage);
