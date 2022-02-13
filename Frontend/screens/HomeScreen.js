import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { Button, Icon, Input } from "react-native-elements";
import { useDispatch, useSelector } from "react-redux";
import tw from "tailwind-react-native-classnames";
import ScreenLayout from "../components/ScreenLayout";
import { logInOut, selectLoginStatus } from "../slices/loginSlice";
import { validate } from "react-email-validator";

const antaresURL = "https://www.cervezaantares.com/";

function HomeScreen() {
  const [userData, setUserData] = useState({ email: "", pwd: "" });
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectLoginStatus);

  return (
    <ScreenLayout>
      {!isLoggedIn ? (
        <>
          <Text style={tw`text-2xl font-bold `}>Bienvenido!</Text>
          <Text style={tw`w-10/12 pt-5 pb-5 text-center`}>
            A continuación ingrese sus datos para iniciar sesión.
          </Text>
          <View
            style={tw`bg-gray-50 w-10/12 p-10 border border-gray-300 rounded-lg shadow-xl mb-8`}
          >
            <Input
              onChangeText={(value) =>
                setUserData({ ...userData, email: value })
              }
              placeholder="correo"
              errorStyle={{ color: 'red' }}
              errorMessage={ !validate(userData.email) && userData.email.length > 0 ? 'Ingrese un correo válido' : null}
              leftIcon={<Icon name="email" size={24} color="black" />}
            />
            <Input
              onChangeText={(value) => setUserData({ ...userData, pwd: value })}
              placeholder="contraseña"
              secureTextEntry
              errorStyle={{ color: 'red' }}
              errorMessage={ userData.pwd.length > 0 && userData.pwd.length < 6 ? 'Ingrese una contraseña válida' : null}
              leftIcon={<Icon name="lock" size={24} color="black" />}
            />
          </View>
          <Button
            title={"Iniciar sesión"}
            type="outline"
            raised
            disabled={!validate(userData.email) || userData.pwd.length == 0}
            containerStyle={{ width: "80%" }}
            onPress={() => {
              if (validate(userData.email) && userData.pwd.length > 0) {
                dispatch(logInOut({ loggedIn: !isLoggedIn }));
              }
            }}
          />
        </>
      ) : (
        <Text>Logged in</Text>
      )}
    </ScreenLayout>
  );
}

export default HomeScreen;
