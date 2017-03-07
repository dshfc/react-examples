import { createStore } from 'redux'
import ghostReducer from './reducer/GhostReducer'
import timeReducer from './reducer/TimeReducer'
import pacManReducer from './reducer/PacManReducer'
import combineReducers from './CombineReducers'

const configureStore = (preloadedState) => {
  const reducer = combineReducers(pacManReducer, ghostReducer, timeReducer);
  const store = createStore(
    reducer,
    preloadedState
  );
  return store;
};

export default configureStore
