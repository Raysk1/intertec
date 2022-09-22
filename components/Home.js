import * as React from "react";
import { Dimensions } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import InformacionDeAlumno from "./Datos_Alumno/InformacionDeAlumno";
import { Ionicons } from "@expo/vector-icons";
import Horario from "./agenda/Horario";
import Kardex from "./Kardex";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { verticalScale } from "react-native-size-matters";

const Tab = createBottomTabNavigator();
const { height } = Dimensions.get("window");
export default function Home() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: { height: "7%", backgroundColor: "#E5E5E5" },
        tabBarItemStyle: {},
        tabBarInactiveTintColor: "#14213D",
        tabBarActiveTintColor: "#FCA311",
        tabBarLabelStyle: { fontSize: height * 0.02 },
      }}
    >
      <Tab.Screen
        name="InformacionDeAlumno"
        component={InformacionDeAlumno}
        options={() => ({
          tabBarIcon: ({ color }) => {
            // You can return any component that you like here!
            return (
              <Ionicons
                name={"person-circle"}
                size={verticalScale(30)}
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
          tabBarIcon: ({ color }) => {
            // You can return any component that you like here!
            return (
              <Ionicons name={"time"} size={verticalScale(30)} color={color} />
            );
          },
          headerShown: false,
          title: "Horario",
        })}
      />
      <Tab.Screen
        name="Kardex"
        component={Kardex}
        options={() => ({
          tabBarIcon: ({ color }) => {
            // You can return any component that you like here!
            return (
              <MaterialCommunityIcons
                name={"newspaper-variant"}
                size={verticalScale(30)}
                color={color}
              />
            );
          },
          headerShown: false,
          title: "Kardex",
        })}
      />
    </Tab.Navigator>
  );
}
