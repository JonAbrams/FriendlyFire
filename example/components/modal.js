import React from 'react';

import ff from '../../src/friendlyFire';

const { PropTypes } = React;

export default class Modal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
    this.outerClick = this.outerClick.bind(this);
  }

  componentDidMount() {
    ff.init(this);
  }

  outerClick(e) {
    // Check if the element clicked is the grayed background of the modal
    if (e.target === e.currentTarget) {
      this.trigger('close');
    }
  }

  render() {
    const { open, children } = this.props;
    return (
      <div
        className={`modalDialog ${open ? 'modalOpen' : ''}`}
        onClick={this.outerClick}
      >
        <div>
          <div>The Modal</div>
          {children}
        </div>
      </div>
    );
  }
}

Modal.propTypes = {
  open: PropTypes.bool.isRequired
};
