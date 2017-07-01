export default function createSimpleEventListener() {
  const callbacks = [];
  
  return {
    registerCallback(eventType, callback) {
      callbacks.push(callback);
    },
  
    fireCallbacks(...params) {
      callbacks.forEach((callback) => {
        callback(...params);
      });
    },
  };
}
