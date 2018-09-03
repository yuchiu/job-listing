import React from "react";
import PropTypes from "prop-types";
import { Button } from "antd";

class InputArea extends React.Component {
  render() {
    const { text, handleChange, handleSubmit } = this.props;
    return (
      <div>
        {" "}
        <textarea
          className="chat-textarea"
          onChange={handleChange}
          name="text"
          value={text}
        />
        <Button type="primary" className="chat-button" onClick={handleSubmit}>
          send
        </Button>
      </div>
    );
  }
}
InputArea.propTypes = {
  text: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired
};
export default InputArea;
