const componentEventSubscribers = {
  // [componentName]: { [eventName]: ...subscribers }
};

function trigger(eventName, data) {
  const componentName = this.constructor.name;
  const events = componentEventSubscribers[componentName];
  debugger;
  if (!events || !events[eventName]) return;
  events[eventName].forEach(subscriber => subscriber());
}

function registerSubscribers(component) {
  const constructor = component.constructor;
  const componentName = constructor.name;
  Object.getOwnPropertyNames(constructor.prototype).forEach(key => {
    const match = key.match(/^on([A-Z]\w*)([A-Z]\w*)$/);
    if (!match) return;
    let [componentName, eventName] = match.slice(-2);
    eventName = eventName.toLowerCase();
    if (!componentEventSubscribers[componentName]) {
      componentEventSubscribers[componentName] = {};
    }
    const events = componentEventSubscribers[componentName];
    if (!events[eventName]) events[eventName] = [];
    events[eventName].push(component[key].bind(component));
  });
}

const ff = {
  init: function (component) {
    component.trigger = trigger;
    registerSubscribers(component)
  }
};

export default ff;
