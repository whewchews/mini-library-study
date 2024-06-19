import { createStore } from "./redux.js";
import { reducer } from "./reducer.js";
import * as Actions from "./actions.js";
import { logger } from "./logger.js";

const asyncRouter = (jobs) => (store) => (next) => (action) => {
  const matchJob = Object.entries(jobs).find([type]=> action.type === type)

  if(matchJob){
    matchJob[1](store, action)
  } else {
    next(action)
  }
 
};

const asyncJobs = {
  [ASYNC_INCREASE_COUNTER]: function (store, action) {
    store.dispatch(Actions.asyncRequest());
    setTimeout(() => {
      store.dispatch(Actions.increase(20));
      store.dispatch(Actions.asyncResponse());
    }, 3000);
  },
};

const store = createStore(reducer, [logger, asyncRouter(asyncJobs)]);

store.subscribe(function () {
  console.log(store.getState());
});

store.dispatch(increase());
console.log("dis => ", store.getState());
