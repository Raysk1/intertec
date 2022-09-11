import * as React from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import * as NB from 'native-base';
import MensajeDeError from './MensajeDeError';
import { LinearGradient } from 'expo-linear-gradient';

import { StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import Alumno from '../src/Alumno';
import { useNavigation } from '@react-navigation/native';

const InicioDeSesion = () => {
  const [isLoading, setLoading] = React.useState(false);
  const [errorStatus, setErrorStatus] = React.useState({
    isActive: false,
    message: '',
  });
  const navigation = useNavigation();
  const [formData, setData] = React.useState({ control: '', password: '' });
  const [errors, setErrors] = React.useState({ control: '', password: '' });

  const validate = () => {
    if (formData.control == '' && formData.password == '') {
      setErrors({
        ...errors,
        control: 'Campo Requerido',
        password: 'Campo Requerido',
      });
      return false;
    } else if (formData.control.length < 8) {
      setErrors({ ...errors, control: 'Numero de control demasiado corto.' });
      return false;
    }

    return true;
  };

  const onSubmit = async () => {
    if (validate()) {
      global.alumno = new Alumno(formData['control'], formData['password']);
      setLoading(true);
      try {
        if (await global.alumno.validarInicioInicioDeSecion()) {
          navigation.navigate('Home');
        } else {
          setErrorStatus({
            isActive: true,
            message: 'Usuario o contraseña incorrecto',
          });
        }
      } catch (error) {
        console.log(error);
        setErrorStatus({ isActive: true, message: 'Error de conexion' });
      } finally {
        setTimeout(
          () => setErrorStatus({ isActive: false, message: '' }),
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
      <LinearGradient colors={['#7ccefa', '#5c26b8']} style={{ flex: 1 }}>
        <KeyboardAwareScrollView style={styles.container}>
          <NB.Box style={styles.titleContainer}>
            <NB.Image
              source={require('../assets/logo.png')}
              size="2xl"
              borderRadius={100}
            />
            <NB.Heading style={styles.title} size={'lg'}>
              Sistema de Integración Escolar
            </NB.Heading>
          </NB.Box>
          <NB.Box
            style={styles.formContainer}
            pointerEvents={isLoading ? 'none' : 'auto'}>
            {isLoading ? <NB.Spinner size={'lg'} /> : null}
            <NB.FormControl
              isRequired
              isInvalid={errors['control'] != ''}
              style={styles.input}>
              <NB.FormControl.Label
                _text={{
                  bold: true,
                }}>
                Numero de control:
              </NB.FormControl.Label>
              <NB.Input
                onChangeText={(value: any) =>
                  setData({ ...formData, control: value })
                }
                onFocus={() => setErrors({ ...errors, control: '' })}
                returnKeyType={'next'}
                onSubmitEditing={() => passRef.current.focus()}
                blurOnSubmit={false}
                keyboardType="numeric"
                maxLength={8}
              />
              {errors['control'] != '' ? (
                <NB.FormControl.ErrorMessage>
                  {errors['control']}
                </NB.FormControl.ErrorMessage>
              ) : (
                <NB.FormControl.HelperText>
                  Deben introducirse almenos 8 numeros.
                </NB.FormControl.HelperText>
              )}
            </NB.FormControl>

            <NB.FormControl
              isRequired
              isInvalid={errors['password'] != ''}
              style={{ marginTop: 10 }}>
              <NB.FormControl.Label
                _text={{
                  bold: true,
                }}>
                Contraseña:
              </NB.FormControl.Label>
              <NB.Input
                onChangeText={(value: any) =>
                  setData({ ...formData, password: value })
                }
                onFocus={() => setErrors({ ...errors, password: '' })}
                secureTextEntry={true}
                ref={passRef}
                
              />
              {errors['password'] != '' ? (
                <NB.FormControl.ErrorMessage>
                  {errors['password']}
                </NB.FormControl.ErrorMessage>
              ) : null}
            </NB.FormControl>
            <NB.Button onPress={onSubmit} mt="5" colorScheme="cyan">
              Ingresar
            </NB.Button>
          </NB.Box>
        </KeyboardAwareScrollView>
      </LinearGradient>
    </NB.NativeBaseProvider>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    backgroundColor: '#ffff',
    width: '100%',
    borderRadius: 70,
    alignItems: 'center',
    padding: '10%',
    alignSelf: 'center',
  },
  titleContainer: {
    alignItems: 'center',

    justifyContent: 'center',
  },
 
  container: {
    padding: 50,
    height: '100%',
    width: '100%',
  },
  input: {},
 
  title: {
    fontWeight: 'bold',

    textAlign: 'center',
    color: 'white',
    marginTop: '5%',
    marginBottom: '10%',
  },
});

export default InicioDeSesion;
