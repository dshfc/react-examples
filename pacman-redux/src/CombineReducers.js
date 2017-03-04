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
    // Use recursion to create binary tree of reducer functions that call all args in order
    const e = arguments[arguments.length-2];
    const f = arguments[arguments.length-1];
    const func = (state, action) => {
      return f(e(state, action), action);
    };
    const args = [...arguments].slice(0, arguments.length-2);
    return combineReducers(...args, func); // Does JS have tail recursion yet?
  }
}
