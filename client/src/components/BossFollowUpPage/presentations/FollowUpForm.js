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
  clientErrors,
  message
}) => (
  <React.Fragment>
    <div className="info-container">
      {clientErrors.avatar && (
        <p className="avatar-msg">
          <InlineError text={clientErrors.avatar} />
        </p>
      )}
      <h2>Please fill out the requirements for the hiring position:</h2>
      <label>Hiring Position:</label>
      {clientErrors.title && <InlineError text={clientErrors.title} />}
      <Input
        placeholder="hiring position"
        size="large"
        name="title"
        value={followUpCredentials.title}
        onChange={handleChange}
      />
      <label>Company:</label>
      {clientErrors.company && <InlineError text={clientErrors.company} />}
      <Input
        placeholder="company"
        size="large"
        name="company"
        value={followUpCredentials.company}
        onChange={handleChange}
      />
      <label>Salary Range:</label>
      {clientErrors.salary && <InlineError text={clientErrors.salary} />}
      <Input
        placeholder="salary range"
        size="large"
        name="salary"
        value={followUpCredentials.salary}
        onChange={handleChange}
      />
      <label>Requirements:</label>
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
