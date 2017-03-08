// Use recursion to create (and unbalanced) binary tree of reducer functions that call all args in order
export default function combineReducers() { // arguments array only available in old-school function()
  return ((args) => { // Attempt to mimic scala "match" using a JS iife and a switch
    switch(args.length) { // http://docs.scala-lang.org/tutorials/tour/pattern-matching.html
      case 0: throw new Error('Invalid number of arguments');
      case 1: return args[0];
      case 2: return (state, action) => args[1](args[0](state, action), action);
      default: return combineReducers(
        ...args.slice(0, args.length-2),
        (state, action) => args[args.length-1](args[args.length-2](state, action), action)
      ); // Tail recursion: http://www.2ality.com/2015/06/tail-call-optimization.html
    }
  })([...arguments]); // Arguments is an Object, not an array, need spread operator to turn into array
}
