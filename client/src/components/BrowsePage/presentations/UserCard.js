import React from "react";
import PropTypes from "prop-types";
import { Card, Icon } from "antd";

import "./UserCard.scss";

const UserCard = ({ browseList, handleClick }) => (
  <React.Fragment>
    {browseList.map(
      user =>
        // do not render if user have no avatar
        user.avatar ? (
          <Card
            className="partner"
            title={`role: ${user.role}`}
            extra={`username: ${user.username}`}
            key={`key-${user._id}`}
          >
            <div className="partner-left">
              <img
                src={require(`../../global/AvatarSelector/images/${
                  user.avatar
                }.png`)}
                alt=""
              />
              <br />
              <a
                className="user-char-chat-with-p"
                onClick={() => handleClick(user)}
              >
                <Icon type="message" />
                contact him/her
              </a>
            </div>
            <div className="partner-right">
              {user.role === "boss" ? (
                <div>
                  <b>hiring position: </b>
                  {user.title}
                </div>
              ) : (
                <div>
                  <b>looking for: </b>
                  {user.title}
                </div>
              )}
              {user.salary ? (
                <div>
                  <b>salary:</b> {user.salary}
                </div>
              ) : null}
              <b>{user.role === "boss" ? "requirement：" : "description: "}</b>
              {user.desc.split("\n").map((desc, i) => (
                <p key={desc + i}>{desc}</p>
              ))}
            </div>
          </Card>
        ) : null
    )}
  </React.Fragment>
);
UserCard.propTypes = {
  browseList: PropTypes.array.isRequired,
  handleClick: PropTypes.func.isRequired
};
export default UserCard;
