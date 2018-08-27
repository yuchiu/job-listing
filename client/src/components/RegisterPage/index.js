import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";

import { validateForm } from "../../utils";
import { FormLogo, InlineError, InfoNav, FormHOC } from "../global";
import { userAction } from "../../actions";
import { RegisterForm } from "./presentations";
import "./index.scss";

class RegisterPage extends React.Component {
  state = {
    clientErrors: {},
    credentials: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      role: "genius"
    }
  };

  componentWillUnmount() {
    this.setState({
      credentials: {
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        role: "genius"
      }
    });
  }

  redirectToLogin = () => {
    const { history } = this.props;
    history.push("/login");
  };

  handleChange = e => {
    const { credentials } = this.state;
    const field = e.target.name;
    credentials[field] = e.target.value;
    this.setState({
      credentials
    });

    if (credentials.password !== credentials.confirmPassword) {
      const { clientErrors } = this.state;
      clientErrors.confirmPassword =
        "Password and Confirm Password don't match.";
      this.setState({ clientErrors });
    } else {
      const { clientErrors } = this.state;
      clientErrors.confirmPassword = "";
      this.setState({ clientErrors });
    }
  };

  handleRegister = e => {
    e.preventDefault();

    const {
      credentials,
      credentials: { username, email, password, confirmPassword, role }
    } = this.state;
    const { register } = this.props;
    if (password === confirmPassword) {
      const clientErrors = validateForm.signUp(credentials);
      this.setState({ clientErrors });
      if (Object.keys(clientErrors).length === 0) {
        register({ username, email, password, role });
      }
    }
  };

  redirectTo = user => {
    let path = "";
    const { role, avatar } = user;
    if (role === "boss" || role === "genius") {
      path = `/${role}followup`;
    }
    return path;
  };

  render() {
    const { credentials, clientErrors } = this.state;
    const { isUserAuthenticated, user, message } = this.props;
    return (
      <div className="login-register-container">
        {isUserAuthenticated &&
          user.role && <Redirect to={this.redirectTo(user)} />}
        <InfoNav name="there" text=" " />
        <FormLogo />
        <h2 className="register-page__title">Register</h2>
        <RegisterForm
          handleRegister={this.handleRegister}
          onChange={this.handleChange}
          redirectToLogin={this.redirectToLogin}
          clientErrors={clientErrors}
          credentials={credentials}
        />
        <br />
        {message && <InlineError text={message} />}
      </div>
    );
  }
}
RegisterPage.propTypes = {
  history: PropTypes.object.isRequired,
  isUserAuthenticated: PropTypes.bool.isRequired,
  register: PropTypes.func.isRequired,
  user: PropTypes.object,
  message: PropTypes.string
};

const stateToProps = state => ({
  isUserAuthenticated: state.userReducer.isUserAuthenticated,
  user: state.userReducer.user,
  message: state.userReducer.message
});

const dispatchToProps = dispatch => ({
  register: credentials => {
    dispatch(userAction.register(credentials));
  }
});

/* wrap around with a simple Form Higher Order Component 
   for testing and playing with HOC, 
   doesn't serve any real purpose */
export default FormHOC(
  connect(
    stateToProps,
    dispatchToProps
  )(RegisterPage)
);
