export default function combineReducers() {
  if(arguments.length <= 0) {
    throw new Error('Invalid number of arguments');
  } else if(arguments.length === 1) {
    return arguments[0];
  } else if(arguments.length === 2) {
    const a = arguments[0];
    const b = arguments[1];
    return (state, action) => b(a(state, action), action);
  } else {
    const a = arguments[arguments.length-3];
    const b = arguments[arguments.length-2];
    const c = arguments[arguments.length-1];
    const func = (state, action) => {
      return c(b(state, action), action);
    };
    return combineReducers(a, func);
  }
}
