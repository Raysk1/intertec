import AsyncStorage from "@react-native-async-storage/async-storage";

export const Init = () => {
  return async dispatch => {
    let alumno = await AsyncStorage.getItem('alumno');
   try {
    if (alumno !== null) {
      alumno = JSON.parse(alumno);
      global.alumno = alumno;
      console.log('alumno fetched');
      await dispatch({
        type: 'LOGIN',
        payload: alumno,
      })
    }
   } catch (error) {
    console.log(error);
    dispatch({
      type:"LOGOUT"
    })
   }
  }
}

export const Login = (alumno) => {
  return async dispatch => {
      // here we can use login api to get alumno and then store it
      let jsonAlumno = JSON.stringify(alumno);
      await AsyncStorage.setItem('alumno', jsonAlumno);
      global.alumno = alumno;
      console.log('alumno stored');
    
    dispatch({
      type: 'LOGIN',
      payload: alumno,
    })
  }
}



export const Logout = () => {
  return async dispatch => {
    await AsyncStorage.clear();
    dispatch({
      type: 'LOGOUT'
    })
  }
}