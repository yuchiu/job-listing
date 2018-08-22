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
    credentials: {
      email: "",
      password: ""
    }
  };

  componentWillUnmount() {
    this.setState({
      credentials: {
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
    const { credentials } = this.state;
    const field = e.target.name;
    credentials[field] = e.target.value;

    this.setState({
      credentials
    });
  };

  handleLogin = e => {
    e.preventDefault();

    const {
      credentials,
      credentials: { email, password }
    } = this.state;

    const clientErrors = validateForm.signIn(credentials);
    this.setState({ clientErrors });
    if (Object.keys(clientErrors).length === 0) {
      const { login } = this.props;
      login(credentials);
    }
  };

  redirectTo = user => {
    let path = "";
    const { role, avatar } = user;
    if (role === "boss" || role === "genius") {
      path = `/${role}`;
      // eslint-disable-next-line
    if (avatar === "") {
        path += "followup";
      } else {
        path = "/dashboard";
      }
    }
    return path;
  };

  render() {
    const { clientErrors, credentials } = this.state;
    const { isUserAuthenticated, message, user } = this.props;
    return (
      <div className="login-page">
        {isUserAuthenticated &&
          user.role && <Redirect to={this.redirectTo(user)} />}
        <InfoNav name="there" text=" " />
        <FormLogo />
        <h2 className="login-page__title">Log In</h2>
        <LoginForm
          handleLogin={this.handleLogin}
          onChange={this.handleChange}
          redirectToRegister={this.redirectToRegister}
          clientErrors={clientErrors}
          credentials={credentials}
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
  message: PropTypes.string,
  user: PropTypes.object
};

const stateToProps = state => ({
  isUserAuthenticated: state.userReducer.isUserAuthenticated,
  user: state.userReducer.user,
  message: state.userReducer.message
});

const dispatchToProps = dispatch => ({
  login: credentials => {
    dispatch(userAction.login(credentials));
  }
});

export default connect(
  stateToProps,
  dispatchToProps
)(LoginPage);
