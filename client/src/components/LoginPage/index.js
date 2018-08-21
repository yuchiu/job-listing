import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";

import { validateForm } from "../../utils";
import { FormLogo, InlineError, InfoNav } from "../global";
import { userAction } from "../../actions";
import { LoginForm } from "./presentations";

class LoginPage extends React.Component {
  state = {
    clientErrors: {},
    credential: {
      email: "",
      password: ""
    }
  };

  componentWillUnmount() {
    this.setState({
      credential: {
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
    const { credential } = this.state;
    const field = e.target.name;
    credential[field] = e.target.value;

    this.setState({
      credential
    });
  };

  handleLogin = e => {
    e.preventDefault();

    const {
      credential,
      credential: { email, password }
    } = this.state;

    const clientErrors = validateForm.signIn(credential);
    this.setState({ clientErrors });
    if (Object.keys(clientErrors).length === 0) {
      const { login } = this.props;
      login({ email, password });
    }
  };

  render() {
    const { clientErrors, credential } = this.state;
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
          credential={credential}
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
  isUserAuthenticated: state.userReducer.isUserAuthenticated,
  redirectTo: state.userReducer.redirectTo,
  message: state.userReducer.message
});

const dispatchToProps = dispatch => ({
  login: credential => {
    dispatch(userAction.login(credential));
  }
});

export default connect(
  stateToProps,
  dispatchToProps
)(LoginPage);
