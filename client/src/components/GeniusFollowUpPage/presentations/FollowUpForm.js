import React from "react";
import { Input, Button } from "antd";
import PropTypes from "prop-types";

import { AvatarSelector } from "../../global";

const FollowUpForm = ({
  selectAvatar,
  handleChange,
  followUpCredentials,
  handleSubmit
}) => (
  <div className="info-container">
    <AvatarSelector selectAvatar={selectAvatar} />
    <h2>Please fill out the requirements for the hiring position:</h2>
    <label>Job Title:</label>
    <Input
      placeholder="job title"
      size="large"
      name="title"
      value={followUpCredentials.title}
      onChange={handleChange}
    />
    <label>About You:</label>
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
  </div>
);

FollowUpForm.propTypes = {
  selectAvatar: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  followUpCredentials: PropTypes.object.isRequired
};
export default FollowUpForm;
