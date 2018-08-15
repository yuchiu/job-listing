import React from "react";
import { Form, Icon, Input, Button } from "antd";
import PropTypes from "prop-types";

const LoginForm = ({
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
    <Form.Item>
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
    </Form.Item>
    {errors.email && (
      <div className="row">
        <p className="error-message">{errors.email}</p>
      </div>
    )}
    <Form.Item>
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
    </Form.Item>
    {errors.password && (
      <div className="row">
        <p className="error-message">{errors.password}</p>
      </div>
    )}
    <Button
      type="primary"
      htmlType="submit"
      className=""
      size="large"
      onClick={handleLogin}
    >
      Log In
    </Button>
    <br /> New to Job Hunting? <a onClick={redirectToRegister}>Register</a>
  </Form>
);

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  redirectToRegister: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
};

export default LoginForm;
