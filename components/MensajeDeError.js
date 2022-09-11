
import {
  Slide,
  Alert,
  Text,
  useColorModeValue,
} from 'native-base';


const Error = (props: { enable: boolean, mensaje: String}) => {
  return (
    <Slide in={props.enable} placement="top">
      <Alert justifyContent="center" style={{ flexDirection: "row"}} status="error" safeAreaTop={7}>
        <Alert.Icon />
        <Text ml ={1} color="error.800">
          {props.mensaje}
        </Text>
      </Alert>
    </Slide>
  );
};

export default Error;
