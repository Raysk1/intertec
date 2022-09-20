/* eslint-disable no-undef */
import * as React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { Box, NativeBaseProvider, Text } from "native-base";
import { ScaledSheet } from "react-native-size-matters";

export default function DatosPersonales() {
  return (
    <NativeBaseProvider>
      <LinearGradient
        colors={["#7ccefa", "#5c26b8"]}
        style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
      >
        <Box style={styles.container}>
          <Box flexBasis={"50%"}>
            <Text style={styles.title}>CIUDAD:</Text>
            <Text style={styles.data}>
              {global.alumno.datosPersonales.ciudad}
            </Text>
          </Box>
          <Box flexBasis={"50%"}>
            <Text style={styles.title}>COLONIA:</Text>
            <Text style={styles.data}>
              {global.alumno.datosPersonales.colonia}
            </Text>
          </Box>
          <Box flexBasis={"50%"}>
            <Text style={styles.title}>CALLE:</Text>
            <Text style={styles.data}>
              {global.alumno.datosPersonales.calle}
            </Text>
          </Box>
          <Box flexBasis={"50%"}>
            <Text style={styles.title}>NO. CALLE:</Text>
            <Text style={styles.data}>
              {global.alumno.datosPersonales.noCalle}
            </Text>
          </Box>
          <Box flexBasis={"50%"}>
            <Text style={styles.title}>CP:</Text>
            <Text style={styles.data}>{global.alumno.datosPersonales.cp}</Text>
          </Box>
          <Box flexBasis={"50%"}>
            <Text style={styles.title}>FECHA NAC.:</Text>
            <Text style={styles.data}>
              {global.alumno.datosPersonales.fechaDeNacimiento}
            </Text>
          </Box>
          <Box flexBasis={"100%"}>
            <Text style={styles.title}>CORREO PER.:</Text>
            <Text style={styles.data}>
              {global.alumno.datosPersonales.correoPersonal}
            </Text>
          </Box>
          <Box flexBasis={"100%"}>
            <Text style={styles.title}>CORREO INS.:</Text>
            <Text style={styles.data}>
              {global.alumno.datosPersonales.correoInstitucional}
            </Text>
          </Box>
          <Box flexBasis={"100%"}>
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

const styles = ScaledSheet.create({
  container: {
    width: "84%",
    height: "90%",
    backgroundColor: "#FFFF",
    borderRadius: 30,
    padding: "4%",
    justifyContent: "center",
    flexWrap: "wrap",
    flexDirection: "row",
    alignContent: "space-between",
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
