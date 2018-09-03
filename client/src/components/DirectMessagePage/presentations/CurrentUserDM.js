import React from "react";
import PropTypes from "prop-types";
import Moment from "react-moment";

class DirectMsg extends React.Component {
  render() {
    const { msg, user } = this.props;
    return (
      <p className="my-msg">
        <img
          className="info-avatar"
          src={require(`../../global/AvatarSelector/images/${user.avatar}.png`)}
          alt=""
        />
        <b>Me</b>
        {" ("}
        <Moment format="MMM D, YYYY" date={msg.timestamp} />
        {")"}:<br />
        {msg.content}
      </p>
    );
  }
}
DirectMsg.propTypes = {
  user: PropTypes.object.isRequired,
  msg: PropTypes.object.isRequired
};
export default DirectMsg;
