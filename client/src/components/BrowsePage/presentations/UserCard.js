import React from "react";
import PropTypes from "prop-types";
import { Card, Icon } from "antd";

const UserCard = ({ browseList, handleClick }) => (
  <React.Fragment>
    {browseList.map(
      user =>
        // do not render if user have no avatar
        user.avatar ? (
          <Card
            title={`position:${user.title}`}
            extra={`${user.username}`}
            key={`key-${user._id}`}
          >
            <div className="left">
              <img
                src={require(`../../global/AvatarSelector/images/${
                  user.avatar
                }.png`)}
                alt=""
              />
              <br />
              <a onClick={() => handleClick(user)}>
                <Icon type="message" />
                contact him/her
              </a>
            </div>
            <div className="right">
              {user.company ? <div>company: {user.company}</div> : null}
              <b>{user.role === "boss" ? "requirement：" : "description: "}</b>
              {user.desc.split("\n").map((desc, i) => (
                <p key={desc + i}>{desc}</p>
              ))}
              {user.salary ? <div>salary: {user.salary}</div> : null}
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
