import * as React from "react";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { Dimensions } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Box, NativeBaseProvider, Text, Button } from "native-base";
const { height } = Dimensions.get("window");
import { ScaledSheet, scale } from "react-native-size-matters";

export default function DatosDeAlumnoMenu() {
  const navigation = useNavigation();

  return (
    <NativeBaseProvider>
      <Box backgroundColor={"#e5e5e5"} flex={1}>
        <LinearGradient
          colors={["#000000", "#14213d"]}
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
            <Text style={styles.userName}>
              {global.alumno.datosGenerales.nombre}
            </Text>
            <Box style={styles.userNumControlContainer} borderRadius={100}>
              <Text style={styles.userNumControl}>{global.alumno.control}</Text>
            </Box>
          </Box>
          <LinearGradient
            style={styles.menuButtonsContainer}
            colors={["#14213d", "#000000"]}
          >
            <Button
              style={styles.button}
              _text={styles.buttonText}
              startIcon={<Ionicons name="person" size={scale(30)}></Ionicons>}
              _pressed={{ backgroundColor: "gray.300" }}
              backgroundColor={"gray.100"}
              onPress={() => {
                navigation.navigate("DatosGenerales");
              }}
            >
              Datos Generales
            </Button>
            <Button
              style={styles.button}
              _text={styles.buttonText}
              startIcon={
                <Ionicons name="finger-print" size={scale(30)}></Ionicons>
              }
              _pressed={{ backgroundColor: "gray.300" }}
              backgroundColor={"gray.100"}
              onPress={() => {
                navigation.navigate("DatosPersonales");
              }}
            >
              Datos Personales
            </Button>
            <Button
              style={styles.button}
              _text={styles.buttonText}
              startIcon={<Ionicons name="school" size={scale(30)}></Ionicons>}
              _pressed={{ backgroundColor: "gray.300" }}
              backgroundColor={"gray.100"}
              onPress={() => {
                navigation.navigate("DatosAcademicos");
              }}
            >
              Datos Academicos
            </Button>
          </LinearGradient>
        </Box>
      </Box>
    </NativeBaseProvider>
  );
}

const styles = ScaledSheet.create({
  headerBackground: {
    width: "100%",
    height: "26%",
    borderBottomLeftRadius: 90,
    borderBottomRightRadius: 90,
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
    backgroundColor: "#fca311",
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
    paddingTop: "7%",
    fontWeight: "bold",
    fontSize: "22@vs",
    textAlign: "center",
    lineHeight: "23@vs",
  },
  dataContainer: {
    alignItems: "center",
    paddingHorizontal: "8%",
  },
  userNumControl: {
    fontSize: "17@vs",
    padding: "5%",
    color: "#FFFF",
    fontWeight: "bold",
  },
  userNumControlContainer: {
    borderRadius: 100,
    marginTop: "4%",
    backgroundColor: "#14213d",
  },
  menuButtonsContainer: {
    width: "100%",
    margin: "5%",
    flex: 1,
    alignItems: "center",
    justifyContent: "space-evenly",

    borderTopLeftRadius: 90,
    borderTopRightRadius: 90,
    borderTopEndRadius: 0,
    borderTopStartRadius: 0,
  },
  button: {
    borderRadius: 100,

    width: "70%",
  },
  buttonText: {
    color: "black",
    fontSize: "18@s",
    fontWeight: "bold",
    paddingLeft: "2%",
  },
});
