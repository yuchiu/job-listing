import React from "react";
import { Form, Icon, Input, Button } from "antd";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";

import "./EditProfile.scss";
import { InlineError } from "../../global";

const EditProfile = ({
  user,
  credentials,
  clientErrors,
  handleChange,
  handleSave,
  history
}) => (
  <Form className="info-container">
    <div className="top-info">
      <img
        src={require(`../../global/AvatarSelector/images/${user.avatar}.png`)}
        alt=""
      />
      <div>username: {user.username}</div>
      <div>email: {user.email}</div>
    </div>
    <Form.Item>
      <label htmlFor="password">Password:</label>
      {clientErrors.password && <InlineError text={clientErrors.password} />}
      <Input
        prefix={<Icon type="lock" />}
        id="password"
        type="password"
        name="password"
        value={credentials.password}
        className="validate"
        onChange={handleChange}
        placeholder="password"
        size="large"
      />
    </Form.Item>
    <Form.Item>
      <label htmlFor="confirm_password">New Password:</label>
      {clientErrors.confirmPassword && (
        <InlineError text={clientErrors.confirmPassword} />
      )}
      <Input
        prefix={<Icon type="lock" />}
        id="new_password"
        type="password"
        name="newPassword"
        value={credentials.newPassword}
        className="validate"
        onChange={handleChange}
        placeholder="new password"
        size="large"
      />
    </Form.Item>
    {user.role === "genius" && (
      <Form.Item>
        <label>Job Title:</label>
        <Input
          placeholder={user.title}
          size="large"
          name="title"
          value={credentials.title}
          onChange={handleChange}
        />
      </Form.Item>
    )}
    {user.role === "boss" && (
      <Form.Item>
        <label>Hiring Position:</label>
        <Input
          placeholder={user.title}
          size="large"
          name="title"
          value={credentials.title}
          onChange={handleChange}
        />
      </Form.Item>
    )}
    {user.role === "boss" && (
      <Form.Item>
        <label>Salary Range:</label>
        <Input
          placeholder={user.salary}
          size="large"
          name="salary"
          value={credentials.salary}
          onChange={handleChange}
        />
      </Form.Item>
    )}
    {user.role === "boss" && (
      <Form.Item>
        <label>Requirements:</label>
        <Input
          placeholder={user.desc}
          autosize={{ minRows: 3 }}
          name="desc"
          value={credentials.desc}
          onChange={handleChange}
        />
      </Form.Item>
    )}
    {user.role === "genius" && (
      <Form.Item>
        <label>Descriptions:</label>
        <Input
          placeholder={user.desc}
          autosize={{ minRows: 3 }}
          name="desc"
          value={credentials.desc}
          onChange={handleChange}
        />
      </Form.Item>
    )}
    <Button
      size="large"
      type="primary"
      className="button1"
      htmlType="submit"
      onClick={handleSave}
    >
      Save
    </Button>
    <Button
      size="large"
      onClick={() => {
        history.push("/my-profile");
      }}
    >
      Cancel
    </Button>
  </Form>
);
EditProfile.propTypes = {
  user: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleSave: PropTypes.func.isRequired,
  credentials: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  clientErrors: PropTypes.object.isRequired
};

export default withRouter(EditProfile);
