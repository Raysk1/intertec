import * as React from "react";
import DatosDeAlumnoMenu from "./DatosDeAlumnoMenu";
import DatosGenerales from "./DatosGenerales";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import DatosPersonales from "./DatosPersonales";
import DatosAcademicos from "./DatosAcademicos";

export default function InformacionDeAlumno() {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator initialRouteName="DatosDeAlumnoMenu">
      <Stack.Screen
        name="DatosDeAlumnoMenu"
        component={DatosDeAlumnoMenu}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="DatosGenerales"
        component={DatosGenerales}
        options={{
          headerTitle: "Datos Generales",
          headerStyle: { backgroundColor: "#E5E5E5" },
        }}
      />
      <Stack.Screen
        name="DatosPersonales"
        component={DatosPersonales}
        options={{
          headerTitle: "Datos Personales",
          headerStyle: { backgroundColor: "#E5E5E5" },
        }}
      />
      <Stack.Screen
        name="DatosAcademicos"
        component={DatosAcademicos}
        options={{
          headerTitle: "Datos Academicos",
          headerStyle: { backgroundColor: "#E5E5E5" },
        }}
      />
    </Stack.Navigator>
  );
}
