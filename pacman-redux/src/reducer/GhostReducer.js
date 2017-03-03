export default (state, action) => {

  if(!state || !state.ghosts) {
    const newState = state || {};
    const myState = {
      ghosts: [
        [13, 10]
      ]
    };
    return Object.assign({}, newState, myState);
  }

  switch (action.type) {
    case 'TICK':
      const ghosts = state.ghosts.map((state) => {
        return [state[0] + 0.1, state[1]];
      });
      return Object.assign({}, state, {
        ghosts: ghosts
      });

    default:
      return state;
  }
}