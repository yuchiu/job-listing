import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { testingAction } from "../../actions";
import { Text } from "./presentations";

class TextChanger extends React.Component {
  state = {
    inputVal: ""
  };

  handleChange = e => {
    this.setState({ inputVal: e.target.value });
  };

  handleClick = () => {
    const { fetchText } = this.props;
    const { inputVal } = this.state;
    fetchText(inputVal);
  };

  render() {
    return (
      <div id="body-container">
        <input onChange={this.handleChange} />
        <button onClick={this.handleClick}>Change Display Text</button>
        <Text text={this.props.text} />
      </div>
    );
  }
}

TextChanger.propTypes = {
  text: PropTypes.string.isRequired,
  fetchText: PropTypes.func.isRequired
};

const stateToProps = state => ({ text: state.testingReducer.text });

const dispatchToProps = dispatch => ({
  fetchText: text => {
    dispatch(testingAction.fetchText(text));
  }
});

export default connect(
  stateToProps,
  dispatchToProps
)(TextChanger);
