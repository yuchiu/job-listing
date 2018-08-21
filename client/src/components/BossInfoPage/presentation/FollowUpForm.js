import React from "react";
import { Input, Button } from "antd";
import PropTypes from "prop-types";

const AvatarSelector = () => <div>avatar selector</div>;

const FollowUpForm = ({ selectAvatar, handleChange, userFollowUpInfo }) => (
  <div className="info-container">
    <AvatarSelector />
    <h2>Please enter the requirements for the hiring position:</h2>
    <label>Hiring Position</label>
    <Input
      placeholder="hiring position"
      size="large"
      name="title"
      value={userFollowUpInfo.title}
      onChange={handleChange}
    />
    <label>Company</label>
    <Input
      placeholder="company"
      size="large"
      name="company"
      value={userFollowUpInfo.company}
      onChange={handleChange}
    />
    <label>Salary Range</label>
    <Input
      placeholder="salary range"
      size="large"
      name="salary"
      value={userFollowUpInfo.salary}
      onChange={handleChange}
    />
    <label>Requirements</label>
    <Input
      placeholder="requirements"
      autosize={{ minRows: 3 }}
      name="desc"
      value={userFollowUpInfo.desc}
      onChange={handleChange}
    />
    <Button
      size="large"
      className="btn"
      onClick={() => {
        console.log(userFollowUpInfo);
      }}
    >
      save
    </Button>
  </div>
);

FollowUpForm.propTypes = {
  selectAvatar: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  userFollowUpInfo: PropTypes.object.isRequired
};
export default FollowUpForm;
