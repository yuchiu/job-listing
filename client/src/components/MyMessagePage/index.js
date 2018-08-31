import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { browseAction } from "../../actions";
import { NavBar } from "../global";

class MyMessagePage extends React.Component {
  componentDidMount() {
    const { fetchList } = this.props;
    fetchList();
  }

  getLast(arr) {
    return arr[arr.length - 1];
  }

  findObjectByKey(array, key, value) {
    for (let i = 0; i < array.length; i + 1) {
      if (array[i][key] === value) {
        return array[i];
      }
    }
    return null;
  }

  render() {
    const { msgList, user, browseList } = this.props;
    const msgGroup = {};
    msgList.forEach(msg => {
      msgGroup[msg.chatId] = msgGroup[msg.chatId] || [];
      msgGroup[msg.chatId].push(msg);
    });

    const directMessageUsersList = Object.values(msgGroup).sort((a, b) => {
      const aLast = this.getLast(a).timestamp;
      const bLast = this.getLast(b).timestamp;
      return aLast - bLast;
    });

    const userid = user.id;
    return (
      <div>
        <NavBar />
        my messages:
        <br />
        {directMessageUsersList.map((dmUser, i) => {
          const lastItem = this.getLast(dmUser);
          console.log(dmUser);
          const targetId = dmUser.from === userid ? dmUser.to : dmUser.from;
          const dmUserInfo =
            browseList.find(obj => obj.id === targetId) || null;
          return (
            <div key={lastItem._id + i}>
              {dmUserInfo && (
                <div>
                  <img
                    className="info-avatar"
                    src={require(`../global/AvatarSelector/images/${
                      dmUserInfo.avatar
                    }.png`)}
                    alt=""
                  />
                  <b>{dmUserInfo.username}</b>
                  <p>{lastItem.content}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    );
  }
}

MyMessagePage.propTypes = {
  fetchList: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  browseList: PropTypes.array.isRequired,
  toUserInfo: PropTypes.object.isRequired,
  msgList: PropTypes.array.isRequired
};
const stateToProps = state => ({
  msgList: state.messageReducer.msgList,
  user: state.userReducer.user,
  browseList: state.browseReducer.browseList,
  toUserInfo: state.messageReducer.toUserInfo
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
