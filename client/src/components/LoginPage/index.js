import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";

import { authAction } from "../../actions";

class AuthPage extends React.Component {
  handleClick = () => {
    const { login } = this.props;
    login({
      user: "yuchiu",
      email: "yuchiu2002@hotmail.com",
      password: "456852yu"
    });
  };

  render() {
    const { isUserAuthenticated } = this.props;
    return (
      <div>
        {isUserAuthenticated && <Redirect to="/dashboard" />}
        you need to login to view dashboard
        <button onClick={this.handleClick}>Log In</button>
      </div>
    );
  }
}

AuthPage.propTypes = {
  isUserAuthenticated: PropTypes.bool.isRequired,
  login: PropTypes.func.isRequired
};
const stateToProps = state => ({
  isUserAuthenticated: state.authReducer.isUserAuthenticated
});
const dispatchToProps = dispatch => ({
  login: userInfo => {
    dispatch(authAction.login(userInfo));
  }
});
export default connect(
  stateToProps,
  dispatchToProps
)(AuthPage);
