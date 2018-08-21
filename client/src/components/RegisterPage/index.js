import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";

import { validateForm } from "../../utils";
import { FormLogo, InlineError } from "../global";
import { authAction } from "../../actions";
import { RegisterForm } from "./presentations";

class RegisterPage extends React.Component {
  state = {
    clientErrors: {},
    user: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      role: ""
    }
  };

  componentDidUpdate() {
    const { isUserAuthenticated } = this.props;
    if (isUserAuthenticated) {
      this.setState({
        user: {
          email: "",
          password: ""
        }
      });
    }
  }

  redirectToLogin = () => {
    const { history } = this.props;
    history.push("/login");
  };

  handleChange = e => {
    const { user } = this.state;
    const field = e.target.name;
    user[field] = e.target.value;

    this.setState({
      user
    });

    if (user.password !== user.confirmPassword) {
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
      user: { username, email, password, confirmPassword, role }
    } = this.state;
    const { register } = this.props;
    if (password === confirmPassword) {
      const clientErrors = validateForm.signUp(this.state.user);
      this.setState({ clientErrors });
      if (Object.keys(clientErrors).length === 0) {
        register({ username, email, password, role });
      }
    }
  };

  render() {
    const { user, clientErrors } = this.state;
    const { isUserAuthenticated, redirectTo, message } = this.props;
    return (
      <div className="register-page">
        {isUserAuthenticated && <Redirect to={redirectTo} />}
        <FormLogo />
        <h2 className="register-page__title">Register</h2>
        <RegisterForm
          handleRegister={this.handleRegister}
          onChange={this.handleChange}
          redirectToLogin={this.redirectToLogin}
          clientErrors={clientErrors}
          user={user}
        />
        <br />
        <InlineError text={message} />
      </div>
    );
  }
}
RegisterPage.propTypes = {
  history: PropTypes.object.isRequired,
  isUserAuthenticated: PropTypes.bool.isRequired,
  register: PropTypes.func.isRequired,
  redirectTo: PropTypes.string,
  message: PropTypes.string
};

const stateToProps = state => ({
  isUserAuthenticated: state.authReducer.isUserAuthenticated,
  redirectTo: state.authReducer.redirectTo,
  message: state.authReducer.message
});

const dispatchToProps = dispatch => ({
  register: userInfo => {
    dispatch(authAction.register(userInfo));
  }
});

export default connect(
  stateToProps,
  dispatchToProps
)(RegisterPage);
