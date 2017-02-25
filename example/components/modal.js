import React from 'react';

const { PropTypes } = React;

export default class Modal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
  }

  render() {
    const { open, children } = this.props;
    return (
      <div>
        <div style={{
          display: open ? 'block' : 'none'
        }}>The Modal</div>
        {children}
      </div>
    );
  }
}

Modal.propTypes = {
  open: PropTypes.bool.isRequired
};
