
const mapReducer = (prevState = { ponit: '' }, action) => {
  let newState = { ...prevState }
  switch (action.type) {
    case 'getPonit':
      newState.ponit = action.payload
      return newState
    default:
      return prevState
  }
}


export default mapReducer