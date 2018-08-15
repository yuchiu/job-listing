import React from "react";
import { Form, Icon, Input, Button } from "antd";
import PropTypes from "prop-types";

const RegisterForm = ({
  handleLogin,
  onChange,
  redirectToRegister,
  errors,
  user
}) => (
  <Form className="login-form">
    {errors.summary && (
      <div className="row">
        <p className="error-message">{errors.summary}</p>
      </div>
    )}
    <Form.item>
      <label htmlFor="username">Username</label>
      <Input
        prefix={<Icon type="user" />}
        id="username"
        type="username"
        name="username"
        value={user.username}
        className=""
        onChange={onChange}
        placeholder="username"
        size="large"
      />
    </Form.item>
    {errors.username && (
      <div className="row">
        <p className="error-message">{errors.username}</p>
      </div>
    )}
    <Form.item>
      <label htmlFor="email">Email</label>
      <Input
        prefix={<Icon type="mail" />}
        id="email"
        type="email"
        name="email"
        value={user.email}
        className=""
        onChange={onChange}
        placeholder="email"
        size="large"
      />
    </Form.item>
    {errors.email && (
      <div className="row">
        <p className="error-message">{errors.email}</p>
      </div>
    )}
    <Form.item>
      <label htmlFor="password">Password</label>
      <Input
        prefix={<Icon type="lock" />}
        id="password"
        type="password"
        name="password"
        value={user.password}
        className="validate"
        onChange={onChange}
        placeholder="password"
        size="large"
      />
    </Form.item>

    {errors.password && (
      <div className="row">
        <p className="error-message">{errors.password}</p>
      </div>
    )}
    <Form.item>
      <label htmlFor="confirm_password">Confirm Password</label>
      <Input
        prefix={<Icon type="lock" />}
        id="confirm_password"
        type="password"
        name="confirmPassword"
        value={user.confirmPassword}
        className="validate"
        onChange={onChange}
        placeholder="confirm password"
        size="large"
      />
    </Form.item>
    <Button
      type="primary"
      htmlType="submit"
      className=""
      size="large"
      onClick={handleLogin}
    >
      Register
    </Button>
    <Button
      type="primary"
      className=""
      size="large"
      onClick={redirectToRegister}
    >
      Sign Up
    </Button>
  </Form>
);

RegisterForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  redirectToRegister: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
};

export default RegisterForm;
