/* eslint-disable no-undef */
import * as React from "react";
import { LinearGradient } from "expo-linear-gradient";

import { StyleSheet, Dimensions } from "react-native";
import { Box, NativeBaseProvider, Text, Button } from "native-base";
const { height, width } = Dimensions.get("window");

export default function DatosAcademicos() {
  return (
    <NativeBaseProvider>
      <LinearGradient
        colors={["#7ccefa", "#5c26b8"]}
        style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
      >
        <Box style={styles.container}>
          <Box>
            <Text style={styles.title}>ESCUELA DE PROCEDENCIA:</Text>
            <Text style={styles.data}>
              {global.alumno.datosAcademicos.escuelaDeProcedencia}
            </Text>
          </Box>
          <Box>
            <Text style={styles.title}>PERIODO DE INGRESO:</Text>
            <Text style={styles.data}>
              {global.alumno.datosAcademicos.periodoDeIngreso}
            </Text>
          </Box>
          <Box>
            <Text style={styles.title}>PERIODO ACTUAL:</Text>
            <Text style={styles.data}>
              {global.alumno.datosAcademicos.periodoActual}
            </Text>
          </Box>
          <Box>
            <Text style={styles.title}>PERIODOS VALIDADOS:</Text>
            <Text style={styles.data}>
              {global.alumno.datosAcademicos.periodosValidados}
            </Text>
          </Box>
          <Box>
            <Text style={styles.title}>CREDITOS ACUMULADOS</Text>
            <Text style={styles.data}>
              {global.alumno.datosAcademicos.creditosAcumulados}
            </Text>
          </Box>
          <Box>
            <Text style={styles.title}>SITUACION:</Text>
            <Text style={styles.data}>
              {global.alumno.datosAcademicos.situacion}
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