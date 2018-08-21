import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";

import { FormLogo } from "../global";
import { authAction } from "../../actions";
import { RegisterForm } from "./presentations";

class RegisterPage extends React.Component {
  state = {
    errors: {},
    user: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      role: ""
    }
  };

  redirectToLogin = () => {
    const { history } = this.props;
    history.push("/login");
  };

  handleChange = e => {
    console.log(this.state.user);
    const { user } = this.state;
    const field = e.target.name;
    user[field] = e.target.value;

    this.setState({
      user
    });

    if (user.password !== user.confirmPassword) {
      const { errors } = this.state;
      errors.password = "Password and Confirm Password don't match.";
      this.setState({ errors });
    } else {
      const { errors } = this.state;
      errors.password = "";
      this.setState({ errors });
    }
  };

  handleRegister = e => {
    e.preventDefault();

    const {
      user: { username, email, password, confirmPassword, role }
    } = this.state;
    const { register } = this.props;
    if (password === confirmPassword) {
      register({ username, email, password, role });
      this.setState({
        user: {
          username: "",
          email: "",
          password: "",
          confirmPassword: "",
          role: ""
        }
      });
    }
  };

  render() {
    const { errors, user } = this.state;
    const { isUserAuthenticated, redirectTo } = this.props;
    console.log(redirectTo);
    return (
      <div className="register-page">
        {isUserAuthenticated && <Redirect to={redirectTo} />}
        <FormLogo />
        <h2 className="register-page__title">Register</h2>
        <RegisterForm
          handleRegister={this.handleRegister}
          onChange={this.handleChange}
          redirectToLogin={this.redirectToLogin}
          errors={errors}
          user={user}
        />
      </div>
    );
  }
}
RegisterPage.propTypes = {
  history: PropTypes.object.isRequired,
  isUserAuthenticated: PropTypes.bool.isRequired,
  register: PropTypes.func.isRequired,
  redirectTo: PropTypes.string
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
