export default (state, action) => {
  switch (action.type) {
    case 'TICK':

      const newState = Object.assign({}, state, {
        time: state.time + 1
      });
      return newState;

    default:
      return state;
  }
}