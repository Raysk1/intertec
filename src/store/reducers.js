
const initialState = {
  alumno: null
}

export default (state = initialState, action) => {
  switch(action.type) {
    case 'LOGIN':
      return {
        ...state, //copy all previous states
        alumno: action.payload,
      }
    case 'LOGOUT':
      global.alumno = null;
      return {
        alumno: null,
      }
    default:
      return state;
  }
}