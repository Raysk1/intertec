import * as React from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import * as NB from "native-base";
import MensajeDeError from "./MensajeDeError";
import { LinearGradient } from "expo-linear-gradient";
import { ScaledSheet } from "react-native-size-matters";

import { Dimensions } from "react-native";
import Constants from "expo-constants";
import Alumno from "../src/Alumno";
import { useNavigation } from "@react-navigation/native";

const { height } = Dimensions.get("window");
const InicioDeSesion = () => {
  const [isLoading, setLoading] = React.useState(false);
  const [errorStatus, setErrorStatus] = React.useState({
    isActive: false,
    message: "",
  });
  const navigation = useNavigation();
  const [formData, setData] = React.useState({ control: "", password: "" });
  const [errors, setErrors] = React.useState({ control: "", password: "" });

  const validate = () => {
    if (formData.control == "" || formData.password == "") {
      setErrors({
        ...errors,
        control: formData.control == "" ? "Campo Requerido" : "",
        password: formData.password == "" ? "Campo Requerido" : "",
      });
      return false;
    } else if (formData.control.length < 8) {
      setErrors({ ...errors, control: "Numero de control demasiado corto." });
      return false;
    }

    return true;
  };

  const onSubmit = async () => {
    if (validate()) {
      global.alumno = new Alumno(formData["control"], formData["password"]);
      setLoading(true);
      try {
        if (await global.alumno.validarInicioInicioDeSecion()) {
          navigation.navigate("Home");
        } else {
          setErrorStatus({
            isActive: true,
            message: "Usuario o contraseña incorrecto",
          });
        }
      } catch (error) {
        console.log(error);
        setErrorStatus({ isActive: true, message: "Error de conexion" });
      } finally {
        setTimeout(
          () => setErrorStatus({ isActive: false, message: "" }),
          4000
        );

        setLoading(false);
      }
    }
  };

  const passRef = React.useRef();
  return (
    <NB.NativeBaseProvider>
      <MensajeDeError
        enable={errorStatus.isActive}
        mensaje={errorStatus.message}
      />
      <LinearGradient colors={["#7ccefa", "#5c26b8"]} style={{ flex: 1 }}>
        <KeyboardAwareScrollView>
          <NB.Box style={styles.container}>
            <NB.Box style={styles.titleContainer}>
              <NB.Image
                source={require("../assets/logo.png")}
                style={styles.image}
              />
              <NB.Heading style={styles.title} fontSize={height * 0.03}>
                Sistema de Integración Escolar
              </NB.Heading>
            </NB.Box>
            <NB.Box
              style={styles.formContainer}
              pointerEvents={isLoading ? "none" : "auto"}
            >
              {isLoading ? <NB.Spinner size={"lg"} /> : null}
              <NB.FormControl isRequired isInvalid={errors["control"] != ""}>
                <NB.FormControl.Label _text={styles.formLabel}>
                  Numero de control:
                </NB.FormControl.Label>
                <NB.Input
                  onChangeText={(value) =>
                    setData({ ...formData, control: value })
                  }
                  onFocus={() => setErrors({ ...errors, control: "" })}
                  returnKeyType={"next"}
                  onSubmitEditing={() => passRef.current.focus()}
                  blurOnSubmit={false}
                  keyboardType="numeric"
                  maxLength={8}
                  _input={styles.input}
                />
                {errors["control"] != "" ? (
                  <NB.FormControl.ErrorMessage _text={styles.errorMessage}>
                    {errors["control"]}
                  </NB.FormControl.ErrorMessage>
                ) : (
                  <NB.FormControl.HelperText _text={styles.errorMessage}>
                    Deben introducirse almenos 8 numeros.
                  </NB.FormControl.HelperText>
                )}
              </NB.FormControl>

              <NB.FormControl isRequired isInvalid={errors["password"] != ""}>
                <NB.FormControl.Label _text={styles.formLabel}>
                  Contraseña:
                </NB.FormControl.Label>
                <NB.Input
                  onChangeText={(value) =>
                    setData({ ...formData, password: value })
                  }
                  onFocus={() => setErrors({ ...errors, password: "" })}
                  secureTextEntry={true}
                  ref={passRef}
                  _input={styles.input}
                />
                {errors["password"] != "" ? (
                  <NB.FormControl.ErrorMessage _text={styles.errorMessage}>
                    {errors["password"]}
                  </NB.FormControl.ErrorMessage>
                ) : null}
              </NB.FormControl>
              <NB.Button
                onPress={onSubmit}
                style={styles.button}
                _text={styles.buttonText}
                colorScheme="cyan"
              >
                Ingresar
              </NB.Button>
            </NB.Box>
          </NB.Box>
        </KeyboardAwareScrollView>
      </LinearGradient>
    </NB.NativeBaseProvider>
  );
};

const styles = ScaledSheet.create({
  formContainer: {
    backgroundColor: "#ffff",
    width: "100%",
    borderRadius: 70,
    alignItems: "center",
    padding: "10%",
    alignSelf: "center",
  },
  titleContainer: {
    alignItems: "center",

    justifyContent: "center",
  },

  container: {
    padding: "10%",
    height: "100%",
    width: "100%",
    paddingTop: Constants.statusBarHeight + height * 0.05,
  },
  input: {
    fontSize: "12@vs",
    height: "30@vs",
  },

  title: {
    fontWeight: "bold",
    fontSize: "28@vs",
    textAlign: "center",
    color: "white",
    marginTop: "10@vs",
    marginBottom: "20@vs",
    paddingTop: "2@vs",
  },
  image: {
    borderRadius: 100,
    height: "175@vs",
    width: "175@vs",
  },
  formLabel: {
    fontSize: "13@vs",
    fontWeight: "bold",
  },
  errorMessage: {
    fontSize: "10@vs",
  },
  button: {
    marginTop: "10%",
  },
  buttonText: {
    fontSize: "13@vs",
  },
});

export default InicioDeSesion;
