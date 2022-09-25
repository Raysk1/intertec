import { LinearGradient } from "expo-linear-gradient";
import { Box, Center, Image, Spinner, Text } from "native-base";
import * as React from "react";
import { ScaledSheet, scale, verticalScale } from "react-native-size-matters";

export default function PantallaDeCarga(){

    return(
        <Box style={{ flex: 1, backgroundColor:"#000000"}}>
           <Center style={styles.container}>
           <Image
                source={require("../assets/logo.png")}
                style={styles.image}
              />
           
           <Box mt={"100%"}>
             <Spinner size={scale(30)} color={"emerald.500" }/>
                <Text color={"#FFFFFF"} fontSize={scale(20)} fontWeight={"bold"}>Cargando</Text>
             </Box>
           </Center>
        </Box>
    );
}

const styles = ScaledSheet.create({
    image: {
        borderRadius: 100,
        height: "180@vs",
        width: "180@vs",
        position:"absolute"
      },
      container:{
        flex:1,
      }
});