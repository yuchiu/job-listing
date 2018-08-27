import React from "react";
import PropTypes from "prop-types";
import { Card, Button } from "antd";
import { withRouter } from "react-router-dom";

import "./Profile.scss";

const Profile = ({ user, history }) => (
  <Card className="personal-center-wrapper">
    <img
      className="info-avatar"
      src={require(`../../global/AvatarSelector/images/${user.avatar}.png`)}
      alt=""
    />
    <Card.Meta
      title=""
      description={
        <div>
          {user.role === "boss" ? (
            <div className="info">
              <b> username: </b>
              {user.username}
              <br />
              <b> email: </b>
              {user.email}
              <br />
              <b> role: </b>
              {user.role}
              <br />
              <b> hiring position: </b>
              {user.title}
              <br />
              <b> offer salary: </b>
              {user.salary}
              <br />
            </div>
          ) : (
            <div className="info">
              <b> username: </b>
              {user.username}
              <br />
              <b> email: </b>
              {user.email}
              <br />
              <b>role: </b> {user.role}
              <br />
              <b>position: </b> {user.title}
              <br />
            </div>
          )}
          <div className="info">
            <b>{user.role === "boss" ? "requirements" : "description"}</b>：
            {user.desc.split("\n").map(v => (
              <p key={v}>{v}</p>
            ))}
          </div>
        </div>
      }
    />
    <Button
      onClick={() => {
        history.push("/edit-profile");
      }}
    >
      Edit
    </Button>
  </Card>
);
Profile.propTypes = {
  user: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};

export default withRouter(Profile);
