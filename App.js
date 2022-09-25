import * as React from "react";
import { ActivityIndicator, StatusBar } from "react-native";
import InicioDeSesion from "./components/InicioDeSesion";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./components/Home";
import { SafeAreaView } from "react-native";
import { Provider, useDispatch, useSelector } from "react-redux";
import { store } from "./src/store";
import RootNavigation from "./components/RootNavigation";

import * as SplashScreen from "expo-splash-screen";

// Prevent native splash screen from autohiding before App component declaration
SplashScreen.preventAutoHideAsync()
  .then((result) =>
    console.log(`SplashScreen.preventAutoHideAsync() succeeded: ${result}`)
  )
  .catch(console.warn); // it's good to explicitly catch and inspect any error

export default class App extends React.Component {
  componentDidMount() {
    // Hides native splash screen after 2s
    setTimeout(async () => {
      await SplashScreen.hideAsync();
    }, 2000);
  }

  render() {
    return (
      <Provider store={store}>
        <StatusBar />
        <RootNavigation />
      </Provider>
    );
  }
}
