import React from "react";
import { Input, Button } from "antd";
import PropTypes from "prop-types";

import { AvatarSelector } from "../../global";

const FollowUpForm = ({
  selectAvatar,
  handleChange,
  credentialFollowUp,
  handleSubmit
}) => (
  <div className="info-container">
    <AvatarSelector selectAvatar={selectAvatar} />
    <h2>Please fill out the requirements for the hiring position:</h2>
    <label>Job Title:</label>
    <Input
      placeholder="hiring position"
      size="large"
      name="title"
      value={credentialFollowUp.title}
      onChange={handleChange}
    />
    <label>About You:</label>
    <Input
      placeholder="requirements"
      autosize={{ minRows: 3 }}
      name="desc"
      value={credentialFollowUp.desc}
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
  credentialFollowUp: PropTypes.object.isRequired
};
export default FollowUpForm;
