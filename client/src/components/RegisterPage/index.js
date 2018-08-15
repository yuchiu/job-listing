import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";

import { authAction } from "../../actions";
import { RegisterForm } from "./presentations";

class RegisterPage extends React.Component {
  state = {
    errors: {},
    user: {
      username: "",
      email: "",
      password: "",
      confirmPassword: ""
    }
  };

  redirectToLogin = () => {
    this.props.history.push("/login");
  };

  handleChange = e => {
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
      user: { username, email, password, confirmPassword }
    } = this.state;
    const { register } = this.props;
    if (password === confirmPassword) {
      register({ username, email, password });
      this.setState({
        user: {
          username: "",
          email: "",
          password: "",
          confirmPassword: ""
        }
      });
    }
  };

  render() {
    const { errors, user } = this.state;
    const { isUserAuthenticated } = this.props;
    return (
      <div className="register-page">
        {isUserAuthenticated && <Redirect to="/" />}
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
  register: PropTypes.func.isRequired
};

const stateToProps = state => ({
  isUserAuthenticated: state.authReducer.isUserAuthenticated
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
