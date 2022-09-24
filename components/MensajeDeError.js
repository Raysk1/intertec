import { Slide, Alert, Text, useColorModeValue } from "native-base";
import { ScaledSheet } from "react-native-size-matters";

const Error = (props: { enable: boolean, mensaje: String, status: String }) => {
  return (
    <Slide in={props.enable} placement="top" duration={1000} >
      <Alert
        justifyContent="center"

        status={props.status}
        safeAreaTop={1}

      >
        <Alert.Icon style={styles.icon} />
        <Text style={styles.text} color={colors[props.status]}>
          {props.mensaje}
        </Text>
      </Alert>
    </Slide>
  );
};

const colors ={
  error: "error.700",
  warning:"warning.700",
  info: "info.700",
  success:"success.700"
};

const styles = ScaledSheet.create({
  text:{
    fontSize:"14@s",
    fontWeight:"bold"
  },
  icon:{
    height:"20@vs",
    width:"20@vs"
  }
});

export default Error;
