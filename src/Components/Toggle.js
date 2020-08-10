import React, {Component} from 'react';

class Toggle extends React.Component {
  render() {
    return (
      <button
        onClick={(e) => {
          e.preventDefault();
          this.props.handleClick(Boolean('true'));
          console.log(this.props.handleClick());
        }}
      >
        {this.props.isToggleOn ? 'ON' : 'OFF'}
      </button>
    );
  }
}

export default Toggle;
