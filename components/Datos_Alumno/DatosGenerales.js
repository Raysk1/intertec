/* eslint-disable no-undef */
import * as React from "react";
import { LinearGradient } from "expo-linear-gradient";

import { StyleSheet, Dimensions } from "react-native";
import { Box, NativeBaseProvider, Text, Button } from "native-base";
const { height, width } = Dimensions.get("window");

export default function DatosGenerales() {
  return (
    <NativeBaseProvider>
      <LinearGradient
        colors={["#7ccefa", "#5c26b8"]}
        style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
      >
        <Box style={styles.container}>
          <Box>
            <Text style={styles.title}>NOMBRE:</Text>
            <Text style={styles.data}>
              {global.alumno.datosGenerales.nombre}
            </Text>
          </Box>
          <Box>
            <Text style={styles.title}>NUMERO DE CONTROL:</Text>
            <Text style={styles.data}>
              {global.alumno.control}
            </Text>
          </Box>
          <Box>
            <Text style={styles.title}>CURP:</Text>
            <Text style={styles.data}>{global.alumno.datosGenerales.curp}</Text>
          </Box>
          <Box>
            <Text style={styles.title}>CARRERA:</Text>
            <Text style={styles.data}>
              {global.alumno.datosGenerales.carrera}
            </Text>
          </Box>
          <Box>
            <Text style={styles.title}>ESPECIALIDAD:</Text>
            <Text style={styles.data}>
              {global.alumno.datosGenerales.especialidad}
            </Text>
          </Box>
          <Box>
            <Text style={styles.title}>MODALIDAD:</Text>
            <Text style={styles.data}>
              {global.alumno.datosGenerales.modalidad}
            </Text>
          </Box>
          <Box>
            <Text style={styles.title}>PLAN DE ESTUDIOS:</Text>
            <Text style={styles.data}>
              {global.alumno.datosGenerales.planDeEstudios}
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
