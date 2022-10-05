/* eslint-disable react/prop-types */
import * as React from "react";
import { LinearGradient } from "expo-linear-gradient";
import {
  Box,
  NativeBaseProvider,
  Text,
  FlatList,
  Center,
  Modal,
} from "native-base";
import { ScaledSheet, verticalScale, scale } from "react-native-size-matters";

import { TouchableOpacity } from "react-native";


export default function Calificaciones() {
  const [isCardOpen, setCardOpen] = React.useState(false);
  const [item, setItem] = React.useState([]);
  const [calificaciones, setCalificaciones] = React.useState([]);
  React.useEffect(() => {
      
    setCalificaciones(global.alumno.calificacionesActuales[0].calificaciones);
}, []);
  const CalificacionesItem = ({ item }) => (
    <TouchableOpacity
      style={styles.container}
      onPress={() => {
        setCardOpen(true);
        setItem(item);
        setCalificaciones(item.calificaciones);
      }}
      activeOpacity={0.8}
    >
      <Box style={styles.textContainer} flex={1} m={"1%"}>
        <Text style={styles.text}>{item.materia}</Text>
      </Box>
      <Box style={[styles.textContainer, styles.calificacionContainer]}>
        <Text style={styles.text}>
          {item.calificaciones.length > 0
            ? String(item.promedio).replace(".", "")
            : "SC"}
        </Text>
      </Box>
    </TouchableOpacity>
  );

  const Card = () => {
    return (
      <Center>
        <Modal
          isOpen={isCardOpen}
          onClose={() => {
            setCardOpen(false);
          }}
        >
          <Modal.Content style={styles.eventCardContainer}>
            <Modal.CloseButton />
            <Modal.Header>
              <Text fontSize={scale(15)} fontWeight={"bold"}>
                Detalles
              </Text>
            </Modal.Header>
            <Modal.Body>
              <Box>
                <Text fontSize={scale(15)} fontWeight={"bold"}>
                  Clave:{" "}
                </Text>
                <Text fontSize={scale(12)}>{item.clave}</Text>
              </Box>
              <Box>
                <Text fontSize={scale(15)} fontWeight={"bold"}>
                  Materia:{" "}
                </Text>
                <Text fontSize={scale(12)}>{item.materia}</Text>
              </Box>

              {calificaciones.map((element, index) => {
                return (
                  <Box key={index}>
                    <Text fontSize={scale(15)} fontWeight={"bold"}>
                      {"Parcial " + (index+1) + ": "}
                    </Text>
                    <Text fontSize={scale(12)}>{element}</Text>
                  </Box>
                );
              })}
            </Modal.Body>
          </Modal.Content>
        </Modal>
      </Center>
    );
  };

  return (
    <NativeBaseProvider>
      <Card />
      <LinearGradient
        colors={["#14213d", "#000000"]}
        style={{ flex: 1, justifyContent: "center" }}
      >
        <FlatList
          data={global.alumno.calificacionesActuales}
          renderItem={CalificacionesItem}
          contentContainerStyle={{
            flexGrow: 1,
            justifyContent: "space-evenly",
          }}
        />
      </LinearGradient>
    </NativeBaseProvider>
  );
}
const styles = ScaledSheet.create({
  container: {
    backgroundColor: "#FFFFFF",
    margin: "8@vs",
    width: "90%",
    borderRadius: 50,
    flexDirection: "row",
    alignSelf: "center",
  },
  textContainer: {
    alignItems: "center",
    justifyContent: "center",
    height: "45@vs",
  },
  calificacionContainer: {
    borderRadius: 100,
    backgroundColor: "#FCA311",
    width: "45@vs",
    height: "45@vs",
    margin: "1%",
  },
  text: {
    fontWeight: "bold",
    fontSize: "15@vs",
    color: "#000000",
  },
  eventCardContainer: {
    width: "60%",
    backgroundColor: "#E5E5E5",
  },
});
