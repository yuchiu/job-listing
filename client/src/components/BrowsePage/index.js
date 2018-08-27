import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { browseAction } from "../../actions";
import { NavBar } from "../global";
import { UserCard } from "./presentations";
import "./index.scss";

class BrowsePage extends React.Component {
  componentDidMount() {
    const { fetchList } = this.props;
    fetchList();
  }

  handleClick = user => {
    const { history } = this.props;
    history.push(`/my-message/${user._id}`);
  };

  render() {
    const { browseList } = this.props;
    return (
      <div className="browse-container">
        <NavBar />
        <UserCard browseList={browseList} handleClick={this.handleClick} />
      </div>
    );
  }
}
BrowsePage.propTypes = {
  fetchList: PropTypes.func.isRequired,
  browseList: PropTypes.array.isRequired,
  history: PropTypes.object.isRequired
};

const stateToProps = state => ({
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
)(BrowsePage);
