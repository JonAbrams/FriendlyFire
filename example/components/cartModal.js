import React from 'react';
import Modal from './modal';
import ff from '../../src/friendlyFire';

export default class CartModal extends React.Component {
  constructor() {
    super();
    this.state = {
      open: false
    }
    this.showCart = this.showCart.bind(this);
  }

  componentDidMount() {
    ff.init(this);
  }

  showCart() {
    this.setState({ open: true });
  }

  onModalClose() {
    this.setState({ open: false });
  }

  render () {
    return (
      <div>
        <button onClick={this.showCart}>Show Cart</button>
        <Modal open={this.state.open}>
          This is the cart!
        </Modal>
      </div>
    );
  }
}
