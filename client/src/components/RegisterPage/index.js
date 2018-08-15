import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

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

  redirectToRegister = () => {
    this.props.history.push("/register");
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

  handleLogin = e => {
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
    return (
      <div className="register-page">
        <h2 className="register-page__title">Log In</h2>
        <RegisterForm
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
RegisterPage.propTypes = {
  history: PropTypes.object.isRequired,
  register: PropTypes.func.isRequired
};

const stateToProps = state => ({});

const dispatchToProps = dispatch => ({
  register: userInfo => {
    dispatch(authAction.register(userInfo));
  }
});

export default connect(
  stateToProps,
  dispatchToProps
)(RegisterPage);
