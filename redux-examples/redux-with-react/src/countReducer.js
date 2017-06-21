const count = (state = 0, action) => {
  if (!action || !action.type) {
    return state
  }

  let newState = state

  switch (action.type) {
    case 'INCREMENT':
      newState++
      return newState
    case 'INCREMENT_BY_VAL':
      newState += action.amount
      return newState
    case 'DECREMENT':
      newState--
      return newState
    default:
      break
  }

  return newState
}

export default count
