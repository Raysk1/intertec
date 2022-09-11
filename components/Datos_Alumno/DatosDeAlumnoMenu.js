import * as React from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";

import { StyleSheet, Dimensions } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Box, NativeBaseProvider, Text, Button } from "native-base";
const { height, width } = Dimensions.get("window");

export default function DatosDeAlumnoMenu() {
  const navigation = useNavigation();
  const route = useRoute();


  return (
    <NativeBaseProvider>
      <LinearGradient
        colors={[ "#5c26b8","#7ccefa",]}
        style={styles.headerBackground}
      ></LinearGradient>
      <Box style={styles.imageContainer}>
        <Box style={styles.image}>
          <Text color={"#FFFF"} fontSize={height / 8}>
            {global.alumno.datosGenerales.nombre.charAt(0)}
          </Text>
        </Box>
      </Box>

      <Box style={styles.menuContainer}>
        <Box style={styles.dataContainer}>
          <Text style={styles.userName}>{global.alumno.datosGenerales.nombre}</Text>
          <LinearGradient
            colors={["#7ccefa", "#5c26b8"]}
            style={styles.userNumControlContainer}
          >
            <Text style={styles.userNumControl}>{global.alumno.control}</Text>
          </LinearGradient>
        </Box>
        <LinearGradient style={styles.menuButtonsContainer} colors={["#7ccefa", "#5c26b8"]} >
          <Button
            style={styles.button}
            _text={styles.buttonText}
            startIcon={<Ionicons name="person" size={height / 24}></Ionicons>}
            _pressed={{backgroundColor: "gray.300"}}
            backgroundColor={"gray.100"}
            onPress={()=>{navigation.navigate("DatosGenerales");}}
            
          >
            Datos Generales
          </Button>
          <Button
            style={styles.button}
            _text={styles.buttonText}
            startIcon={<Ionicons name="finger-print" size={height / 24}></Ionicons>}
            _pressed={{backgroundColor: "gray.300"}}
            backgroundColor={"gray.100"}
            onPress={()=>{navigation.navigate("DatosPersonales");}}
            
          >
            Datos Personales
          </Button>
          <Button
            style={styles.button}
            _text={styles.buttonText}
            startIcon={<Ionicons name="school" size={height / 24}></Ionicons>}
            _pressed={{backgroundColor: "gray.300"}}
            backgroundColor={"gray.100"}
            onPress={()=>{navigation.navigate("DatosAcademicos");}}
          >
            Datos Academicos
          </Button>
        </LinearGradient>
      </Box>
    </NativeBaseProvider>
  );
}

const styles = StyleSheet.create({
  headerBackground: {
    width: "100%",
    height: "26%",
    borderBottomLeftRadius: width / 5,
    borderBottomRightRadius: width / 5,
    borderBottomEndRadius: 0,
    borderBottomStartRadius: 0,
    overflow: "hidden",
  },
  imageContainer: {
    top: 0,
    left: 0,
    right: 0,
    height: "52%",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
  },
  image: {
    borderRadius: 100,
    backgroundColor: "red",
    width: height / 5,
    height: height / 5,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
  },
  menuContainer: {
    top: "10%",
    alignItems: "center",
    
    height: "67%",
  },
  userName: {
    paddingTop: "3%",
    fontWeight: "bold",
    fontSize: width / 14,
    textAlign: "center",
    lineHeight: width*.1,
  },
  dataContainer: {
    alignItems: "center",
    paddingHorizontal: "8%",
  },
  userNumControl: {
    fontSize: width / 18,
    padding: "3%",
    color: "#FFFF",
    fontWeight: "bold",
  },
  userNumControlContainer: {
    borderRadius: width / 2,
    marginTop: "2%",
  },
  menuButtonsContainer: {
    width: "100%",
    margin:"5%",
    flex: 1,
    alignItems: "center",
    justifyContent: "space-evenly",
    
    borderTopLeftRadius: width / 5,
    borderTopRightRadius: width / 5,
    borderTopEndRadius: 0,
    borderTopStartRadius: 0,
  },
  button: {
    borderRadius: width / 2,
  
    width: "70%",
  },
  buttonText: {
    color: "black",
    fontSize: width / 18,
    fontWeight: "bold"
  },
});
