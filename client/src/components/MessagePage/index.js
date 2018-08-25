import React from "react";
import io from "socket.io-client";

import { NavBar } from "../global";

class MessagePage extends React.Component {
  componentDidMount() {
    const socket = io("ws://localhost:3200");
  }

  render() {
    return (
      <div>
        <NavBar />
        {/* MessagePage page. chating with user: {this.props.match.params.user} */}
      </div>
    );
  }
}
export default MessagePage;
