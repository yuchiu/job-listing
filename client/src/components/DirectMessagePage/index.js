import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import "./index.scss";
import { messageAction, browseAction } from "../../actions";
import { NavBar, InlineError } from "../global";
import { getDirectMsgId } from "../../utils";
import { TargetUserDM, CurrentUserDM, InputArea } from "./presentations";

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

    const { user, msgList, toUserInfo, error, history } = this.props;
    const directMsgId = getDirectMsgId(user.id, toUserInfo.id);
    const directMsgList = msgList.filter(msg => msg.chatId === directMsgId);
    return (
      <div className="chat-container">
        <NavBar />
        <p className="chat-container-username">
          <a
            onClick={() => {
              this.props.history.goBack();
            }}
          >
            &lt;
          </a>
          {toUserInfo.username}
        </p>

        <div className="chat-content">
          {directMsgList.map(
            (msg, i) =>
              msg.from === user.id ? (
                <CurrentUserDM key={msg._id + i} user={user} msg={msg} />
              ) : (
                <TargetUserDM
                  key={msg._id + i}
                  toUserInfo={toUserInfo}
                  msg={msg}
                />
              )
          )}
        </div>
        <InlineError text={error} />
        <InputArea
          text={text}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
        />
      </div>
    );
  }
}

DirectMessagePage.propTypes = {
  getMsgList: PropTypes.func.isRequired,
  receiveMsg: PropTypes.func.isRequired,
  clearMsgToUserInfo: PropTypes.func.isRequired,
  getToUserInfo: PropTypes.func.isRequired,

  history: PropTypes.object.isRequired,
  toUserInfo: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,

  msgList: PropTypes.array.isRequired,

  error: PropTypes.string.isRequired,

  clearList: PropTypes.func.isRequired,
  subToMsg: PropTypes.func.isRequired,
  unSubToMsg: PropTypes.func.isRequired,
  sendMsg: PropTypes.func.isRequired,
  readMsg: PropTypes.func.isRequired,

  isSubToMsg: PropTypes.bool.isRequired
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
