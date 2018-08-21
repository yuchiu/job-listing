import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";

import { FormLogo } from "../global";
import { authAction } from "../../actions";
import { LoginForm } from "./presentations";

class LoginPage extends React.Component {
  state = {
    errors: {},
    user: {
      email: "",
      password: ""
    }
  };

  redirectToRegister = () => {
    const { history } = this.props;
    history.push("/register");
  };

  handleChange = e => {
    const { user } = this.state;
    const field = e.target.name;
    user[field] = e.target.value;

    this.setState({
      user
    });
  };

  handleLogin = e => {
    e.preventDefault();

    const {
      user: { email, password }
    } = this.state;
    const { login } = this.props;
    login({ email, password });
    this.setState({
      user: {
        email: "",
        password: ""
      }
    });
  };

  render() {
    const { errors, user } = this.state;
    const { isUserAuthenticated, redirectTo } = this.props;
    return (
      <div className="login-page">
        {isUserAuthenticated && <Redirect to={redirectTo} />}
        <FormLogo />
        <h2 className="login-page__title">Log In</h2>
        <LoginForm
          handleLogin={this.handleLogin}
          onChange={this.handleChange}
          redirectToRegister={this.redirectToRegister}
          errors={errors}
          user={user}
        />
      </div>
    );
  }
}
LoginPage.propTypes = {
  history: PropTypes.object.isRequired,
  login: PropTypes.func.isRequired,
  isUserAuthenticated: PropTypes.bool.isRequired,
  redirectTo: PropTypes.string
};

const stateToProps = state => ({
  isUserAuthenticated: state.authReducer.isUserAuthenticated,
  redirectTo: state.authReducer.redirectTo
});

const dispatchToProps = dispatch => ({
  login: userInfo => {
    dispatch(authAction.login(userInfo));
  }
});

export default connect(
  stateToProps,
  dispatchToProps
)(LoginPage);
