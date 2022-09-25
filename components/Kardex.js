/* eslint-disable react/prop-types */
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
const { height, width } = Dimensions.get("screen");

export default function Kardex() {
  const [isShowPercent, setShowPercent] = React.useState(false);
  const [isCardOpen, setCardOpen] = React.useState(false);
  const [item, setItem] = React.useState({});

  const KardexItem = ({ item }) => (
    <TouchableOpacity
      style={styles1.container}
      onPress={() => {
        setCardOpen(true);
        setItem(item);
      }}
      activeOpacity={0.8}
    >
      <Box style={styles1.textContainer} flex={1} m={"1%"}>
        <Text style={styles1.text}>{item.materia}</Text>
      </Box>
      <Box style={[styles1.textContainer, styles1.calificacionContainer]}>
        <Text style={styles1.text}>{item.calificacion}</Text>
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
              <Box>
                <Text fontSize={scale(15)} fontWeight={"bold"}>
                  Calificacion:{" "}
                </Text>
                <Text fontSize={scale(12)}>{item.calificacion}</Text>
              </Box>
              <Box>
                <Text fontSize={scale(15)} fontWeight={"bold"}>
                  Periodo:{" "}
                </Text>
                <Text fontSize={scale(12)}>{item.periodo}</Text>
              </Box>
            </Modal.Body>
          </Modal.Content>
        </Modal>
      </Center>
    );
  };

  const EmptyKardex = () => {
    return (
      <Center style={styles.emptyKardexContainer}>
        <Box style={styles.EmptyKardexIconContainer}>
        <Ionicons name="md-alert-outline" size={verticalScale(60)} color="#FFFFFF"/ >
        </Box>
        
        <Box style={styles.emptyKardexTextContainer}> 
          <Text style={styles.emptyKardexText}>
            NO HAY MATERIAS EN LA RETICULA
          </Text>
        </Box>
      </Center>
    );
  };

  return (
    <NativeBaseProvider>
      <LinearGradient
        colors={["#14213d", "#000000"]}
        style={{ flex: 1, justifyContent: "center" }}
      >
        <Card />

        <FlatList
          data={global.alumno.kardex.datos}
          renderItem={KardexItem}
          ListEmptyComponent={EmptyKardex}
        />

        <Box style={styles.progressContainer}>
          {isShowPercent ? (
            <Box style={styles.dataContainer}>
              <Box alignItems={"center"}>
                <Text style={styles.text}>% de avance:</Text>
                <Text style={styles.text} color={"#FCA311"}>
                  {global.alumno.kardex.avance}
                </Text>
              </Box>
              <Box alignItems={"center"} flex={1}>
                <Box w="100%">
                  <Progress
                    value={Number(global.alumno.kardex.avance)}
                    marginLeft={"10%"}
                    _filledTrack={{ bgColor: "#FCA311" }}
                  />
                </Box>
              </Box>
            </Box>
          ) : (
            <Box style={styles.dataContainer}>
              <Box alignItems={"center"}>
                <Text style={styles.text}>Promedio:</Text>
                <Text style={styles.text} color={"#FCA311"}>
                  {global.alumno.kardex.promedio}
                </Text>
              </Box>
              <Box alignItems={"center"}>
                <Text style={styles.text}>Creditos acumulados:</Text>
                <Text style={styles.text} color={"#FCA311"}>
                  {global.alumno.kardex.creditos.obtenidos} de{" "}
                  {global.alumno.kardex.creditos.totales}
                </Text>
              </Box>
            </Box>
          )}
          <Box style={styles.buttonContainer}>
            <Button
              style={styles.button}
              leftIcon={
                <MaterialCommunityIcons
                  name="rotate-3d-variant"
                  size={verticalScale(15)}
                  color="black"
                />
              }
              onPress={() => {
                setShowPercent(!isShowPercent);
              }}
              bg={"#FCA311"}
              _pressed={{ bg: "#ed9402" }}
            />
          </Box>
        </Box>
      </LinearGradient>
    </NativeBaseProvider>
  );
}

const styles = ScaledSheet.create({
  progressContainer: {
    backgroundColor: "white",
    width: "100%",

    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: "5%",
  },
  text: {
    fontSize: "13@vs",
    fontWeight: "bold",
  },
  button: {
    borderRadius: 100,
    height: "45@vs",
    width: "45@vs",
  },
  dataContainer: {
    justifyContent: "space-evenly",
    paddingHorizontal: "5%",
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  buttonContainer: {
    margin: "1%",
  },
  eventCardContainer: {
    width: "60%",
    backgroundColor: "#E5E5E5",
  },
  emptyKardexText: {
    fontSize: "20@vs",
    fontWeight: "bold",
    color: "#FFFFFF",
    padding: "5%",
    textAlign:"center",
    lineHeight:"25@vs"
  },
  emptyKardexContainer: {
    width: width,
    height: height * 0.84,
  },
  emptyKardexTextContainer:{
    backgroundColor:"#FCA311",
    marginTop:"10%",
    borderRadius:100,
    justifyContent:"center"

  },
  EmptyKardexIconContainer:{
    backgroundColor:"#FCA311",
    width:"90@vs",
    height:"90@vs",
    borderRadius:100,
    alignItems:"center",
    justifyContent:"center"
  }
});

const styles1 = ScaledSheet.create({
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
    justifyContent:"center",
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
    color: "#000000"
  },
});
