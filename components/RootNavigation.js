import * as React from "react";
import { ActivityIndicator, StatusBar } from "react-native";
import InicioDeSesion from "./InicioDeSesion";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./Home";
import {useDispatch, useSelector } from "react-redux";
import { NativeBaseProvider, View } from "native-base";
import { Init, Login } from "../src/store/actions";
import Error from "./MensajeDeError";
import Alumno from "../src/Alumno";
import PantallaDeCarga from "./PantallaDeCarga";

const Stack = createNativeStackNavigator();

const MyStack = () => {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen
        name="Home"
        component={Home}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

const AuthStack = () => {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen
        name="InicioDeSesion"
        component={InicioDeSesion}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

const RootNavigation = () => {
  const token = useSelector((state) => state.Reducers.alumno);
  const [loading, setLoading] = React.useState(true);
  const [connectionStatus, setConnectionStatus] = React.useState({
    isActive: false,
    message: "",
    status: "",
  });

  const dispatch = useDispatch();
  const init = async () => {
    let status;
    await dispatch(Init());
    if (global.alumno != null) {
      try {
        let alumno = new Alumno(global.alumno.control, global.alumno.password);
        await alumno.validarInicioInicioDeSecion();
        dispatch(Login(global.alumno));
        status = "success";
        setConnectionStatus({
          isActive: true,
          message: "Se han actualizado los datos con exito",
          status: status,
        });
      } catch (error) {
        status = "error";
        setConnectionStatus({
          isActive: true,
          message: "Error de conexion",
          status: status,
        });
        console.log(error);
      }
    }
    setTimeout(
      () => setConnectionStatus({ isActive: false, status: status }),
      6000
    );
    setLoading(false);
  };

  React.useEffect(() => {
    init();
  }, []);

  if (loading) {
    return (
      <NativeBaseProvider>
       <PantallaDeCarga/>
      </NativeBaseProvider>
    );
  }

  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <Error
          mensaje={connectionStatus.message}
          status={connectionStatus.status}
          enable={connectionStatus.isActive}
        />
        <StatusBar backgroundColor="black" barStyle="light-content" />
        {token == null ? <AuthStack /> : <MyStack />}
      </NavigationContainer>
    </NativeBaseProvider>
  );
};
export default RootNavigation;