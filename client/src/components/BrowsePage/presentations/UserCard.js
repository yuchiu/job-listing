import React from "react";
import PropTypes from "prop-types";
import { Card, Icon } from "antd";

const UserCard = ({ browseList }) => (
  <React.Fragment>
    {browseList.map(
      card =>
        // do not render if user have no avatar
        card.avatar ? (
          <Card
            title={`position:${card.title}`}
            extra={`${card.username}`}
            key={`key-${card.id}`}
          >
            <div className="left">
              <img
                src={require(`../../global/AvatarSelector/images/${
                  card.avatar
                }.png`)}
                alt=""
              />
              <p onClick={console.log("this.handleClick.bind(this, card)")}>
                <Icon type="message" />
                contact him/her
              </p>
            </div>
            <div className="right">
              {card.company ? <div>company: {card.company}</div> : null}
              <b>{card.role === "boss" ? "requirement：" : "description: "}</b>
              {card.desc.split("\n").map((desc, i) => (
                <p key={desc + i}>{desc}</p>
              ))}
              {card.salary ? <div>salary: {card.salary}</div> : null}
            </div>
          </Card>
        ) : null
    )}
  </React.Fragment>
);
UserCard.propTypes = {
  browseList: PropTypes.array.isRequired
};
export default UserCard;
