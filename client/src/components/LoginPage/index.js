import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";

import { validateForm } from "../../utils";
import { FormLogo, InlineError, InfoNav } from "../global";
import { authAction } from "../../actions";
import { LoginForm } from "./presentations";

class LoginPage extends React.Component {
  state = {
    clientErrors: {},
    user: {
      email: "",
      password: ""
    }
  };

  componentWillUnmount() {
    this.setState({
      user: {
        email: "",
        password: ""
      }
    });
  }

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
      user,
      user: { email, password }
    } = this.state;

    const clientErrors = validateForm.signIn(user);
    this.setState({ clientErrors });
    if (Object.keys(clientErrors).length === 0) {
      const { login } = this.props;
      login({ email, password });
    }
  };

  render() {
    const { clientErrors, user } = this.state;
    const { isUserAuthenticated, redirectTo, message } = this.props;
    return (
      <div className="login-page">
        {redirectTo && <Redirect to={redirectTo} />}
        <InfoNav name="there" text=" " />
        <FormLogo />
        <h2 className="login-page__title">Log In</h2>
        <LoginForm
          handleLogin={this.handleLogin}
          onChange={this.handleChange}
          redirectToRegister={this.redirectToRegister}
          clientErrors={clientErrors}
          user={user}
        />
        <br />
        {message && <InlineError text={message} />}
      </div>
    );
  }
}
LoginPage.propTypes = {
  history: PropTypes.object.isRequired,
  login: PropTypes.func.isRequired,
  isUserAuthenticated: PropTypes.bool.isRequired,
  redirectTo: PropTypes.string,
  message: PropTypes.string
};

const stateToProps = state => ({
  isUserAuthenticated: state.authReducer.isUserAuthenticated,
  redirectTo: state.authReducer.redirectTo,
  message: state.authReducer.message
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
