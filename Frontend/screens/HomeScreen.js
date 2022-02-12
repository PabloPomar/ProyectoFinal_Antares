import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { Button, Icon, Input } from "react-native-elements";
import { useDispatch, useSelector } from "react-redux";
import tw from "tailwind-react-native-classnames";
import ScreenLayout from "../components/ScreenLayout";
import { selectUserData } from "../slices/loginSlice";

const antaresURL = "https://www.cervezaantares.com/";

function HomeScreen() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const userData = useSelector(selectUserData)

  return (
    <ScreenLayout>
      <Text style={tw`text-2xl font-bold `}>Bienvenido!</Text>
      <Text style={tw`w-10/12 pt-5 pb-5 text-center`}>
        A continuación ingrese sus datos para iniciar sesión.
      </Text>
      <View
        style={tw`bg-gray-100 w-10/12 p-10 border border-gray-400 rounded-lg shadow-xl mb-8`}
      >
        <Input
          style={tw``}
          placeholder="correo"
          leftIcon={<Icon name="email" size={24} color="black" />}
        />
        <Input
          style={tw``}
          placeholder="contraseña"
          secureTextEntry
          leftIcon={<Icon name="lock" size={24} color="black" />}
        />
      </View>
      <Button
        title={"Iniciar sesión"}
        type="outline"
        raised
        containerStyle={{ width: "80%" }}
        onPress={() => console.log(userData)}
      />
    </ScreenLayout>
  );
}

export default HomeScreen;
