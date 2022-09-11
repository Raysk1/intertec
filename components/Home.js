import * as React from 'react';
import { Dimensions } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import InformacionDeAlumno from './Datos_Alumno/InformacionDeAlumno';
import { Ionicons } from "@expo/vector-icons";


const Tab = createBottomTabNavigator();
const { height, width } = Dimensions.get("window");
export default function Home() {
  return (
    <Tab.Navigator screenOptions={{
      tabBarStyle: { height: "8%",backgroundColor:"#ffff"},
      tabBarItemStyle:{borderTopWidth:1, borderColor:"black"},
      tabBarInactiveTintColor:"#7ccefa",
      tabBarActiveTintColor: "#5c26b8",
      tabBarLabelStyle:{fontSize:height*.02}


      
    }}>
      <Tab.Screen  
        name="InformacionDeAlumno"
        component={InformacionDeAlumno}
        options={() => ({
          tabBarIcon: ({color}) => {
            // You can return any component that you like here!
            return <Ionicons name={'person-circle'} size={height*.05} color={color} />;
          },
          headerShown: false,
          title:"Info"
        })}
      />
      
    </Tab.Navigator>
  );
}
