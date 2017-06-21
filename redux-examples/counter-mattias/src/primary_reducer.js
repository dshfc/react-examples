export default function reducer(state = {}, action) {
  let newState = state

  switch (action.type) {
    case 'INCREMENT_BY_VAL':
      return {
        ...newState,
        count: newState.count + action.amount
      }
    default:
      return newState
  }
}