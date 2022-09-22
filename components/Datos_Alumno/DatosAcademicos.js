import * as React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { Box, NativeBaseProvider, Text } from "native-base";
import { ScaledSheet } from "react-native-size-matters";
export default function DatosAcademicos() {
  return (
    <NativeBaseProvider>
      <LinearGradient
        colors={["#14213d", "#000000"]}
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

const styles = ScaledSheet.create({
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
    fontSize: "20@vs",
    textAlign: "center",
    paddingTop: "2.5@vs",
    marginBottom: "4@vs",
  },
  data: {
    fontSize: "15@vs",
    textAlign: "center",
    paddingTop: "2@vs",
  },
});
