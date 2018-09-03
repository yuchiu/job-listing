import React from "react";
import PropTypes from "prop-types";
import Moment from "react-moment";

class DirectMsg extends React.Component {
  render() {
    const { msg, toUserInfo } = this.props;
    return (
      <p className="my-msg">
        {" "}
        {toUserInfo.avatar && (
          <img
            className="info-avatar"
            src={require(`../../global/AvatarSelector/images/${
              toUserInfo.avatar
            }.png`)}
            alt=""
          />
        )}
        <b>{toUserInfo.username}</b> (
        <Moment format="MMM D, YYYY" date={msg.timestamp} />
        ):
        <br />
        {msg.content}
      </p>
    );
  }
}
DirectMsg.propTypes = {
  toUserInfo: PropTypes.object.isRequired,
  msg: PropTypes.object.isRequired
};
export default DirectMsg;
