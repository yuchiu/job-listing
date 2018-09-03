import React from "react";
import PropTypes from "prop-types";
import { Icon, Badge } from "antd";
import Moment from "react-moment";

class Msg extends React.Component {
  render() {
    const { lastMsg, dmUserInfo, unreadNum, handleClick } = this.props;
    return (
      <div>
        {dmUserInfo && (
          <div className="msg-item" onClick={() => handleClick(dmUserInfo._id)}>
            <div className="msg-name-avatar">
              <img
                className="info-avatar"
                src={require(`../../global/AvatarSelector/images/${
                  dmUserInfo.avatar
                }.png`)}
                alt=""
              />
            </div>
            <p className="msg-content">
              <b>{dmUserInfo.username}</b>
              <br />
              <Moment format="MMM D, YYYY" date={lastMsg.timestamp} />
              <br />
              {lastMsg.content}
            </p>
            <span>
              <Badge count={unreadNum} />
            </span>
          </div>
        )}
      </div>
    );
  }
}

Msg.propTypes = {
  lastMsg: PropTypes.object.isRequired,
  dmUserInfo: PropTypes.object.isRequired,
  handleClick: PropTypes.func.isRequired,
  unreadNum: PropTypes.number.isRequired
};

export default Msg;
