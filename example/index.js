import ReactDOM from 'react-dom';
import React from 'react';
import CartModal from './components/cartModal';

(function () {
  function ready(fn) {
    if (document.readyState != 'loading'){
      fn();
    } else {
      document.addEventListener('DOMContentLoaded', fn);
    }
  }

  ready(function () {
    ReactDOM.render(<CartModal />, document.getElementById('cart-app'));
  });
})(document);
