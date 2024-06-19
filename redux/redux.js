export const actionCreator = (type) => (payload) => ({
  type,
  payload,
});

export function createStore(reducer, middlewares = []) {
  let state;
  let handlers = [];

  function dispatch(action) {
    state = reducer(state, action);
    handlers.forEach((handler) => handler());
  }

  function getState() {
    return state;
  }

  function subscribe(handler) {
    handlers.push(handler);
  }

  const store = {
    dispatch,
    getState,
    subscribe,
  };

  // monkey patching dispatch function
  middlewares = Array.from(middlewares.reverse());
  let lastDispatch = dispatch;

  middlewares.forEach((middleware) => {
    lastDispatch = middleware(store)(lastDispatch);
  });

  store.dispatch = lastDispatch;

  return store;
}
