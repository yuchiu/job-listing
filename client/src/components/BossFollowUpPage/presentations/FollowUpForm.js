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
    <label>Hiring Position:</label>
    <Input
      placeholder="hiring position"
      size="large"
      name="title"
      value={followUpCredentials.title}
      onChange={handleChange}
    />
    <label>Company:</label>
    <Input
      placeholder="company"
      size="large"
      name="company"
      value={followUpCredentials.company}
      onChange={handleChange}
    />
    <label>Salary Range:</label>
    <Input
      placeholder="salary range"
      size="large"
      name="salary"
      value={followUpCredentials.salary}
      onChange={handleChange}
    />
    <label>Requirements:</label>
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
