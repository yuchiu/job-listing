import React from "react";
import PropTypes from "prop-types";
import { Card, Button } from "antd";

const Profile = ({ user, toggleEdit }) => (
  <Card className="personal-center-wrapper">
    <img
      src={require(`../../global/AvatarSelector/images/${user.avatar}.png`)}
      alt=""
    />
    <Card.Meta
      title={`username：${user.username}`}
      description={
        <div>
          <b>{user.role === "boss" ? "requirements" : "description"}</b>：
          {user.desc.split("\n").map(v => (
            <p key={v}>{v}</p>
          ))}
        </div>
      }
    />
    <Button onClick={toggleEdit}>Edit</Button>
  </Card>
);
Profile.propTypes = {
  user: PropTypes.object.isRequired,
  toggleEdit: PropTypes.func.isRequired
};

export default Profile;
