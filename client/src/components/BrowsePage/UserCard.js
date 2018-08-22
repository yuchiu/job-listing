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
            key={card.id}
          >
            <div className="niuren-left">
              <img
                src={require(`../global/AvatarSelector/images/${
                  card.avatar
                }.png`)}
                alt=""
              />
              <p onClick={console.log("this.handleClick.bind(this, card)")}>
                <Icon type="message" />
                contact him/her
              </p>
            </div>
          </Card>
        ) : null
    )}
  </React.Fragment>
);
UserCard.propTypes = {
  browseList: PropTypes.array.isRequire
};
export default UserCard;
