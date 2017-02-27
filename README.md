# FriendlyFire

Easy cross-component communication using pubsub, designed for React. No dependencies.

## Why?

React provides a built-in mechanism for parent components to communicate with child components: props.
In order to allow components to communicate with parent, sibling, or unrelated components, the are various solutions;
most famously Flux. While it's a great solution, especially for large and complex projects, it requires a lot
of boilerplate code, and spreads logic across many files. Perhaps most annoying of all, it requires parent
components to send callback handlers to children, sometimes over many generations.

Using FriendlyFire, components easily subscribe to events triggered by other components. Components
that trigger events don't need to know what will consume them, they don't need to add extra props for callbacks.

Just by looking at a component's subscription methods, you can easily tell which events, emitted by
a particular component, it subscribes to. The emitting components on the other hand, need not care who subscribes.

This model of communication enables modularity/portability of components, reducing the dependencies of components
on each other, making component dependency exist in only one direction, from parent to child.

## Example

```javascript
import ff from 'friendlyfire';

class ModalShower extends React.Component {
  constructor() {
    super();
    this.state = { modalOpen: false };
  }

  componentDidMount() {
    ff.init(this); // Register with FriendlyFire to have subscribers registered
  }

  // Auto-subscribes to 'close' event from Modal components
  onModalClose() {
    this.setState({ modalOpen: false });
  }

  render() {
    return(
      <div>
        <button onClick={this.openModal.bind(this)}>Open Modal</button>
        <Modal open={this.state.modalOpen}>
          Contents of modal
        </Modal>
      </div>
    );
  }
}

class Modal extends React.Component {
  componentDidMount() {
    ff.init(this); // Register with FriendlyFire to make trigger(…) method available
  }

  handleOuterClick(e) {
    if (e.target === e.currentTarget) {
      this.trigger('close');
    }
  }

  render() {
    return (
      <div className='outerModal'
        onClick={this.handleOuterClick.bind(this)}
      >
        <div className='innerModal'>
          <div className='closeButton' onClick={this.handleOuterClick.bind(this)}>
            {this.props.children}
          </div>
        </div>
      </div>
    )
  }
}
```

## API

### ff.init(_component_)

Initializes a react component to be able to publish and subscribe using FriendlyFire.

Recommended that you put this into `componentDidMount` and pass in `this` as the parameter.

Add `trigger` and will scan the components' methods looking potential subscribers, and use them.

### <component>.trigger(_eventName_)

Will fire any subscribers listening for the specified event from the triggering component.

### <component>.onComponentNameEventname(data)

To register a subscriber on a component, create a method on it using the above pattern.

Note: The event specified needs to be all lowercase (with the exception of the first character).
