export default (state, action) => {

  if(!state) {
    return {
      ghosts: [
        [13, 10]
      ]
    };
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