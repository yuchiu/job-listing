import React from "react";
import { Form, Icon, Input, Button } from "antd";
import PropTypes from "prop-types";

import { InlineError } from "../../global";

const EditProfile = ({
  user,
  credentials,
  clientErrors,
  handleChange,
  handleSave
}) => (
  <Form className="info-container">
    <img
      src={require(`../../global/AvatarSelector/images/${user.avatar}.png`)}
      alt=""
    />
    <div>username: {user.username}</div>
    <div>username: {user.email}</div>
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
        <label>Company:</label>
        <Input
          placeholder={user.company}
          size="large"
          name="company"
          value={credentials.company}
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
    <Button size="large" htmlType="submit" onClick={handleSave}>
      Save
    </Button>
  </Form>
);
EditProfile.propTypes = {
  user: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleSave: PropTypes.func.isRequired,
  credentials: PropTypes.object.isRequired,
  clientErrors: PropTypes.object.isRequired
};

export default EditProfile;
