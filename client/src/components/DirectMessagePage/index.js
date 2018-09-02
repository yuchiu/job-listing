import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Button } from "antd";

import { messageAction, browseAction } from "../../actions";
import { NavBar } from "../global";
import { getDirectMsgId } from "../../utils";

class DirectMessagePage extends React.Component {
  state = {
    text: ""
  };

  componentDidMount() {
    const {
      getMsgList,
      getToUserInfo,
      receiveMsg,
      msgList,
      subToMsg,
      readMsg,
      isSubToMsg,
      match: {
        params: { toUserId }
      }
    } = this.props;

    getToUserInfo(toUserId);

    getMsgList();

    subToMsg();

    readMsg({ targetUserId: toUserId });

    // listen to receive msg only once when the msg list is empty initially.
    if (isSubToMsg) {
      receiveMsg();
    }
  }

  componentWillUnmount() {
    const { clearMsgToUserInfo, clearList, unSubToMsg } = this.props;
    clearMsgToUserInfo();
    clearList();
    unSubToMsg();
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

    const { user, msgList, toUserInfo, error } = this.props;
    const directMsgId = getDirectMsgId(user.id, toUserInfo.id);
    const directMsgList = msgList.filter(msg => msg.chatId === directMsgId);
    return (
      <div>
        <NavBar />
        hi {user.username}! you are chating with user: {toUserInfo.username}
        {directMsgList.map(
          (m, i) =>
            m.from === user.id ? (
              <p key={m._id + i} className="my-msg">
                <img
                  className="info-avatar"
                  src={require(`../global/AvatarSelector/images/${
                    user.avatar
                  }.png`)}
                  alt=""
                />
                Me: {m.content}
              </p>
            ) : (
              <p key={m._id + i}>
                {" "}
                {toUserInfo.avatar && (
                  <img
                    className="info-avatar"
                    src={require(`../global/AvatarSelector/images/${
                      toUserInfo.avatar
                    }.png`)}
                    alt=""
                  />
                )}
                {toUserInfo.username}: {m.content}
              </p>
            )
        )}
        <p>{error}</p>
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

DirectMessagePage.propTypes = {
  user: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  msgList: PropTypes.array.isRequired,
  getMsgList: PropTypes.func.isRequired,
  receiveMsg: PropTypes.func.isRequired,
  clearMsgToUserInfo: PropTypes.func.isRequired,
  getToUserInfo: PropTypes.func.isRequired,
  toUserInfo: PropTypes.object.isRequired,
  error: PropTypes.string.isRequired,
  clearList: PropTypes.func.isRequired,
  subToMsg: PropTypes.func.isRequired,
  unSubToMsg: PropTypes.func.isRequired,
  readMsg: PropTypes.func.isRequired,
  isSubToMsg: PropTypes.bool.isRequired,
  sendMsg: PropTypes.func.isRequired
};
const stateToProps = state => ({
  msgList: state.messageReducer.msgList,
  error: state.messageReducer.error,
  isSubToMsg: state.messageReducer.isSubToMsg,
  user: state.userReducer.user,
  toUserInfo: state.messageReducer.toUserInfo
});

const dispatchToProps = dispatch => ({
  getMsgList: () => {
    dispatch(messageAction.getMsgList());
  },
  readMsg: targetUserId => {
    dispatch(messageAction.readMsg(targetUserId));
  },
  sendMsg: text => {
    dispatch(messageAction.sendMsg(text));
  },

  subToMsg: () => {
    dispatch(messageAction.subToMsg());
  },

  unSubToMsg: () => {
    dispatch(messageAction.unSubToMsg());
  },

  receiveMsg: () => {
    dispatch(messageAction.receiveMsg());
  },
  clearMsgToUserInfo: () => {
    dispatch(messageAction.clearMsgToUserInfo());
  },
  getToUserInfo: toFromUserId => {
    dispatch(messageAction.getToUserInfo(toFromUserId));
  },
  clearList: () => {
    dispatch(browseAction.clearList());
  }
});

export default connect(
  stateToProps,
  dispatchToProps
)(DirectMessagePage);
