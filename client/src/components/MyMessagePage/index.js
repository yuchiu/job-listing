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
    text: ""
  };

  async componentDidMount() {
    const { getMsgList, receiveMsg } = this.props;
    getMsgList();
    receiveMsg();
  }

  handleChange = e => {
    this.setState({
      text: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { text } = this.state;
    const {
      sendMsg,
      user,
      match: {
        params: { toUserId }
      }
    } = this.props;
    const fromUserId = user.id;
    sendMsg({ fromUserId, toUserId, text });
    this.setState({
      text: ""
    });
  };

  render() {
    const { text } = this.state;

    const {
      user,
      msgList,
      match: {
        params: { toUserId }
      }
    } = this.props;
    return (
      <div>
        <NavBar />
        {user.id}
        MyMessagePage page. chating with user: {toUserId}
        {msgList.map((m, i) => (m.content ? <p key={i}>{m.content}</p> : null))}
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
  user: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  msgList: PropTypes.array.isRequired,
  getMsgList: PropTypes.func.isRequired,
  receiveMsg: PropTypes.func.isRequired,
  sendMsg: PropTypes.func.isRequired
};
const stateToProps = state => ({
  msgList: state.messageReducer.msgList,
  user: state.userReducer.user
});

const dispatchToProps = dispatch => ({
  getMsgList: () => {
    dispatch(messageAction.getMsgList());
  },
  sendMsg: text => {
    dispatch(messageAction.sendMsg(text));
  },
  receiveMsg: () => {
    dispatch(messageAction.receiveMsg());
  }
});

export default connect(
  stateToProps,
  dispatchToProps
)(MyMessagePage);
