import Alumno from "../Alumno"
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
      return {
        alumno: null,
      }
    default:
      return state;
  }
}