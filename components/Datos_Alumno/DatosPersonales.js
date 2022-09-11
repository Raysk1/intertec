/* eslint-disable no-undef */
import * as React from "react";
import { LinearGradient } from "expo-linear-gradient";

import { StyleSheet, Dimensions } from "react-native";
import { Box, NativeBaseProvider, Text, Button } from "native-base";
const { height, width } = Dimensions.get("window");

export default function DatosPersonales() {
  return (
    <NativeBaseProvider>
      <LinearGradient
        colors={["#7ccefa", "#5c26b8"]}
        style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
      >
        <Box style={styles.container}>
          <Box>
            <Text style={styles.title}>CIUDAD:</Text>
            <Text style={styles.data}>
              {global.alumno.datosPersonales.ciudad}
            </Text>
          </Box>
          <Box>
            <Text style={styles.title}>COLONIA:</Text>
            <Text style={styles.data}>
              {global.alumno.datosPersonales.colonia}
            </Text>
          </Box>
          <Box>
            <Text style={styles.title}>CALLE:</Text>
            <Text style={styles.data}>
              {global.alumno.datosPersonales.calle}
            </Text>
          </Box>
          <Box>
            <Text style={styles.title}>NO. CALLE:</Text>
            <Text style={styles.data}>
              {global.alumno.datosPersonales.noCalle}
            </Text>
          </Box>
          <Box>
            <Text style={styles.title}>CP:</Text>
            <Text style={styles.data}>
              {global.alumno.datosPersonales.cp}
            </Text>
          </Box>
          <Box>
            <Text style={styles.title}>FECHA NAC.:</Text>
            <Text style={styles.data}>
              {global.alumno.datosPersonales.fechaDeNacimiento}
            </Text>
          </Box>
          <Box>
            <Text style={styles.title}>CORREO PER.:</Text>
            <Text style={styles.data}>
              {global.alumno.datosPersonales.correoPersonal}
            </Text>
          </Box>
          <Box>
            <Text style={styles.title}>CORREO INS.:</Text>
            <Text style={styles.data}>
              {global.alumno.datosPersonales.correoInstitucional}
            </Text>
          </Box>
          <Box>
            <Text style={styles.title}>TELEFONO:</Text>
            <Text style={styles.data}>
              {global.alumno.datosPersonales.telefono}
            </Text>
          </Box>
        </Box>
      </LinearGradient>
    </NativeBaseProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "84%",
    height: "90%",
    backgroundColor: "#FFFF",
    borderRadius: 30,
    alignItems: "center",
    padding: "4%",
    justifyContent: "space-between",
  },
  title: {
    fontWeight: "bold",
    fontSize: width * 0.065,
    textAlign: "center",
    lineHeight: width * 0.08,
  },
  data: {
    fontSize: width * 0.05,
    textAlign: "center",
    lineHeight: width * 0.08,
  },
});
