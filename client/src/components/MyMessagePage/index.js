import React from "react";
import io from "socket.io-client";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Button } from "antd";

import { messageAction } from "../../actions";
import { NavBar } from "../global";

const socket = io("ws://localhost:3200");

class MyMessagePage extends React.Component {
  state = {
    text: "",
    messages: []
  };

  componentDidMount() {
    const { getMsgList } = this.props;
    getMsgList();
    socket.on("receiveMsg", data => {
      this.setState({
        messages: [...this.state.messages, data.text]
      });
    });
  }

  handleChange = e => {
    this.setState({
      text: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { text } = this.state;
    socket.emit("sendMsg", { text });
    this.setState({
      text: ""
    });
  };

  render() {
    const { text, messages } = this.state;
    return (
      <div>
        <NavBar />
        MyMessagePage page. chating with user: {this.props.match.params.user}
        {messages.map((m, i) => (
          <p key={i}>{m}</p>
        ))}
        <textarea
          className="chat-textarea"
          onChange={this.handleChange}
          name="text"
          value={text}
        />
        <span className="chat-emoji" aria-label="" role="img">
          😄
        </span>
        <Button
          type="primary"
          className="chat-button"
          onClick={this.handleSubmit}
        >
          send
        </Button>
      </div>
    );
  }
}

MyMessagePage.propTypes = {
  match: PropTypes.object.isRequired,
  getMsgList: PropTypes.func.isRequired
};
const stateToProps = state => ({ messageReducer: state.messageReducer });

const dispatchToProps = dispatch => ({
  getMsgList: () => {
    dispatch(messageAction.getMsgList());
  }
});

export default connect(
  stateToProps,
  dispatchToProps
)(MyMessagePage);
