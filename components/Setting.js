import * as React from "react";
import { LinearGradient } from "expo-linear-gradient";
import {
  Box,
  NativeBaseProvider,
  Text,
  FlatList,
  Button,
  Progress,
  Center,
  Modal,
} from "native-base";
import { ScaledSheet, verticalScale, scale } from "react-native-size-matters";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity, Dimensions } from "react-native";
import { useNavigation } from "@react-navigation/core";
import { useDispatch } from "react-redux";
import { Logout } from "../src/store/actions";
const { height, width } = Dimensions.get("screen");

export default function Settings() {
  const dispatch = useDispatch();
  const submit = () => {
    dispatch(Logout());
  }
  return (
    <NativeBaseProvider>
      <LinearGradient
        colors={["#14213d", "#000000"]}
        style={{ flex: 1, justifyContent: "center" }}>
        <Box style={styles.container}>
            <Button onPress={submit}>Cerrar Sesion</Button>
            
        </Box>
      </LinearGradient>
    </NativeBaseProvider>
  );
}

const styles = ScaledSheet.create({
    container: {
        width: "70%",
        height: "70%",
        backgroundColor: "#FFFF",
        borderRadius: 30,
        alignItems: "center",
        padding: "4%",
        justifyContent: "space-between",
        alignSelf:"center"
      },
});
