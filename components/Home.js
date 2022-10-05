import * as React from "react";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import InformacionDeAlumno from "./Datos_Alumno/InformacionDeAlumno";
import { Ionicons } from "@expo/vector-icons";
import Horario from "./horario/Horario";
import Kardex from "./Kardex";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { verticalScale, scale } from "react-native-size-matters";
import Settings from "./Setting";
import Calificaciones from "./Calificaciones";

const Tab = createBottomTabNavigator();
export default function Home() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: { height: "7%", backgroundColor: "#E5E5E5" },
        tabBarItemStyle: {},
        tabBarInactiveTintColor: "#14213D",
        tabBarActiveTintColor: "#FCA311",
        tabBarLabelStyle: { fontSize: scale(10) },
      }}
    >
      <Tab.Screen
        name="InformacionDeAlumno"
        component={InformacionDeAlumno}
        options={() => ({
          tabBarIcon: ({ color, focused }) => {
            // You can return any component that you like here!
            return (
              <Ionicons
                name={focused ? "person-circle" : "person-circle-outline"}
                size={verticalScale(22)}
                color={color}
              />
            );
          },
          headerShown: false,
          title: "Info",
        })}
      />

      <Tab.Screen
        name="Horario"
        component={Horario}
        options={() => ({
          tabBarIcon: ({ color, focused }) => {
            // You can return any component that you like here!
            return (
              <Ionicons
                name={focused ? "time" : "time-outline"}
                size={verticalScale(22)}
                color={color}
              />
            );
          },
          headerShown: false,
          title: "Horario",
        })}
      />

      <Tab.Screen
        name="Calificaciones"
        component={Calificaciones}
        options={() => ({
          tabBarIcon: ({ color, focused }) => {
            // You can return any component that you like here!
            return (
              <Ionicons
                name={focused ? "school" : "school-outline"}
                size={verticalScale(22)}
                color={color}
              />
            );
          },
          headerShown: false,
          title: "Calificaciones",
        })}
      />
      <Tab.Screen
        name="Kardex"
        component={Kardex}
        options={() => ({
          tabBarIcon: ({ color, focused }) => {
            // You can return any component that you like here!
            return (
              <MaterialCommunityIcons
                name={
                  focused ? "newspaper-variant" : "newspaper-variant-outline"
                }
                size={verticalScale(22)}
                color={color}
              />
            );
          },
          headerShown: false,
          title: "Kardex",
        })}
      />

      <Tab.Screen
        name="Settings"
        component={Settings}
        options={() => ({
          tabBarIcon: ({ color, focused }) => {
            // You can return any component that you like here!
            return (
              <Ionicons
                name={focused ? "settings" : "settings-outline"}
                size={verticalScale(22)}
                color={color}
              />
            );
          },
          headerShown: false,
          title: "Settings",
        })}
      />
    </Tab.Navigator>
  );
}
