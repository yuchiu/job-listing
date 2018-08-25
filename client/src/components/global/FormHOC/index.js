import React from "react";

// a simple higher order component form to inherit traits for components that wrap inside it

const FormHOC = Comp =>
  class WarperComp extends React.Component {
    state = {};

    handleChange = e => {
      const { name, value } = e.target;
      this.setState({
        [name]: value
      });
    };

    render() {
      return (
        <Comp
          {...this.props}
          handleChange={this.handleChange}
          state={this.state}
        />
      );
    }
  };

export default FormHOC;
