import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import "./index.scss";
import { browseAction } from "../../actions";
import { NavBar } from "../global";
import { Msg } from "./presentations";

class MyMessagePage extends React.Component {
  componentDidMount() {
    const { fetchList } = this.props;
    fetchList();
  }

  getLast(arr) {
    return arr[arr.length - 1];
  }

  handleClick = id => {
    const { history } = this.props;
    history.push(`/direct-message/${id}`);
  };

  render() {
    const { msgList, user, browseList } = this.props;
    const msgGroup = {};

    // go through the list and group the msg from same user into one msgGroup;
    msgList.forEach(msg => {
      msgGroup[msg.chatId] = msgGroup[msg.chatId] || [];
      msgGroup[msg.chatId].push(msg);
    });

    // sort the msgGroup into list by ascending order of timestamp
    const directMessageList = Object.values(msgGroup)
      .sort((a, b) => {
        const aLast = this.getLast(a).timestamp;
        const bLast = this.getLast(b).timestamp;
        return aLast - bLast;
      })
      .reverse();

    // current logged in user
    const userid = user.id;
    return (
      <div>
        <NavBar />
        <div className="msg-container">
          {/* map out direct msg list */}
          {directMessageList.map((dmMsg, i) => {
            // get the most recent direct msg
            const lastMsg = this.getLast(dmMsg);

            // get the id of other user who sent msg to current logged in user
            const targetId =
              lastMsg.from === userid ? lastMsg.to : lastMsg.from;

            // get the target user's info by iterating the user list using target id
            const dmUserInfo = browseList.find(obj => obj._id === targetId);

            // filter out unread msg
            const unreadNum = dmMsg.filter(
              unreadMsg => !unreadMsg.read && unreadMsg.to === userid
            ).length;

            // display target user's info and most recent direct msg
            return (
              <Msg
                key={lastMsg._id + i}
                lastMsg={lastMsg}
                dmUserInfo={dmUserInfo}
                unreadNum={unreadNum}
                handleClick={this.handleClick}
              />
            );
          })}
        </div>
      </div>
    );
  }
}

MyMessagePage.propTypes = {
  fetchList: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  browseList: PropTypes.array.isRequired,
  history: PropTypes.object.isRequired,
  msgList: PropTypes.array.isRequired
};
const stateToProps = state => ({
  msgList: state.messageReducer.msgList,
  user: state.userReducer.user,
  browseList: state.browseReducer.browseList
});
const dispatchToProps = dispatch => ({
  fetchList: () => {
    dispatch(browseAction.fetchList());
  }
});

export default connect(
  stateToProps,
  dispatchToProps
)(MyMessagePage);
