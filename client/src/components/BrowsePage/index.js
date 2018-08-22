import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { browseAction } from "../../actions";
import { NavBar } from "../global";
import UserCard from "./UserCard";

class BrowsePage extends React.Component {
  componentDidMount() {
    const { fetchList } = this.props;
    fetchList();
  }

  render() {
    const { browseList } = this.props;
    return (
      <div>
        <NavBar />
        <UserCard browseList={browseList} />
      </div>
    );
  }
}
BrowsePage.propTypes = {
  fetchList: PropTypes.func.isRequired,
  browseList: PropTypes.array.isRequired
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
