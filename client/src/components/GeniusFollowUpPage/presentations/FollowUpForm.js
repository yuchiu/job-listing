import React from "react";
import { Input, Button } from "antd";
import PropTypes from "prop-types";

import { AvatarSelector, InlineError } from "../../global";
import "./FollowUpForm.scss";

const FollowUpForm = ({
  selectAvatar,
  handleChange,
  followUpCredentials,
  handleSubmit,
  message,
  clientErrors
}) => (
  <React.Fragment>
    {clientErrors.avatar && (
      <p className="avatar-msg">
        <InlineError text={clientErrors.avatar} />
      </p>
    )}
    <AvatarSelector selectAvatar={selectAvatar} />
    <div className="info-container">
      <h2>Please fill out the requirements for the hiring position:</h2>
      <label>Job Title:</label>
      {clientErrors.title && <InlineError text={clientErrors.title} />}
      <Input
        placeholder="job title"
        size="large"
        name="title"
        value={followUpCredentials.title}
        onChange={handleChange}
      />
      <label>About You:</label>
      {clientErrors.desc && <InlineError text={clientErrors.desc} />}
      <Input
        placeholder="requirements"
        autosize={{ minRows: 3 }}
        name="desc"
        value={followUpCredentials.desc}
        onChange={handleChange}
      />
      <Button size="large" className="btn" onClick={handleSubmit}>
        save
      </Button>
      {message && <InlineError text={message} />}
    </div>
  </React.Fragment>
);

FollowUpForm.propTypes = {
  selectAvatar: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  message: PropTypes.string.isRequired,
  clientErrors: PropTypes.object.isRequired,
  followUpCredentials: PropTypes.object.isRequired
};
export default FollowUpForm;
