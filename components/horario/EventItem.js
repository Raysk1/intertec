/* eslint-disable react/prop-types */
import * as React from "react";
import { Box, Text } from "native-base";
import { ScaledSheet } from "react-native-size-matters";

export default function EventItem({ event, position }) {
  return (
    <Box height={position.height} style={styles.container}>
      <Text style={styles.descriptionText}>{event.materia}</Text>
      <Text style={styles.locationText}>{event.aula}</Text>
    </Box>
  );
}

const styles = ScaledSheet.create({
  container: {
    justifyContent: "space-evenly",
    alignItems: "center",
    flex:1,
    padding:"10%"
  },
  descriptionText: {
    fontSize: "10@s",
    color: "black",
    fontWeight: "bold",
    textAlign: "center",
  },
  locationText: {
    fontSize: "12@s",
    color: "black",
    fontWeight: "bold",
  },
});
