import React from "react";
import { Form, Icon, Input, Radio, Button } from "antd";
import PropTypes from "prop-types";

const RegisterForm = ({
  handleRegister,
  onChange,
  redirectToLogin,
  errors,
  user
}) => (
  <Form className="register-form">
    {errors.summary && (
      <div className="row">
        <p className="error-message">{errors.summary}</p>
      </div>
    )}
    <Form.Item>
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
    </Form.Item>
    {errors.username && (
      <div className="row">
        <p className="error-message">{errors.username}</p>
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
    <Form.Item>
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
    </Form.Item>
    <Button
      type="primary"
      htmlType="submit"
      className=""
      size="large"
      onClick={handleRegister}
    >
      Register
    </Button>
    <br /> Already have an account? <a onClick={redirectToLogin}>Log In</a>
  </Form>
);

RegisterForm.propTypes = {
  handleRegister: PropTypes.func.isRequired,
  redirectToLogin: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
};

export default RegisterForm;
