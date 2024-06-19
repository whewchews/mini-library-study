import * as ActionType from "./action-type.js";

const InitializeState = {
  count: 0,
};

export function reducer(state = InitializeState, action) {
  // 참조 끊어서 새로운 객체 만들어서 리턴

  switch (action.type) {
    case ActionType.INCREASE_COUNTER:
      if (action.payload) {
        return {
          ...state,
          count: state.count + action.payload,
        };
      } else {
        return {
          ...state,
          count: state.count === undefined ? 1 : state.count + 1,
        };
      }

    case Actions.DECREASE_COUNTER:
      return {
        ...state,
        counter: state.counter === undefined ? 0 : state.counter - 1,
      };
    case Actions.SET_COUNTER:
      return { ...state, counter: action.payload };
    case Actions.ASYNC_REQUEST:
      return { ...state, request: true };
    case Actions.ASYNC_RESPONSE:
      return { ...state, request: false };

    default:
      return { ...state };
  }
}
