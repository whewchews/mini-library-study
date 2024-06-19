export const logger = (store) => (next) => (action) => {
  const currentState = store.getState();

  console.groupCollasped("action logger => ", action.type);
  console.log("current state:", currentState);
  console.log("action payload", action.payload);
  console.groupEnd();
  next(action);
};
