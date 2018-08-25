import React from "react";
import io from "socket.io-client";
import PropTypes from "prop-types";
import { Button, Row, Col } from "antd";

import { NavBar } from "../global";

class MessagePage extends React.Component {
  componentDidMount() {
    const socket = io("ws://localhost:3200");
  }

  render() {
    return (
      <div>
        <NavBar />
        MessagePage page. chating with user: {this.props.match.params.user}
        <textarea className="chat-textarea" onChange={console.log()} value="" />
        <span className="chat-emoji" aria-label="" role="img">
          😄
        </span>
        <Button type="primary" className="chat-button" onClick={console.log()}>
          send
        </Button>
      </div>
    );
  }
}

MessagePage.propTypes = {
  match: PropTypes.object.isRequired
};

export default MessagePage;
