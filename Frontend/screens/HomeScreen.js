import React, { useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { Avatar, Button, Icon, Input } from "@rneui/themed";
import { useDispatch, useSelector } from "react-redux";
import tw from "tailwind-react-native-classnames";
import ScreenLayout from "../components/ScreenLayout";
import {
  login,
  logout,
  selectLoginStatus,
  selectToken,
} from "../slices/loginSlice";
import { validate } from "react-email-validator";
import { useNavigation } from "@react-navigation/native";
import { setSelected } from "../slices/navOptionsSlice";
import { useUserLoginMutation } from "../services/usuario";
import { getUserFromToken } from "../utils";
import {
  selectOrderPaid,
  selectOrderStatus,
  statusColors,
  updateOrderStatus,
} from "../slices/orderSlice";

function HomeScreen() {
  const [userData, setUserData] = useState({ email: "", pwd: "" });
  const [userLogin, { isLoading, isError, isSuccess, data }] =
    useUserLoginMutation();
  const dispatch = useDispatch();
  const orderPaid = useSelector(selectOrderPaid);
  const orderStatus = useSelector(selectOrderStatus);
  const isLoggedIn = useSelector(selectLoginStatus);
  const token = useSelector(selectToken);
  const navigation = useNavigation();

  const handleLogin = async (data) => {
    let userName = data.email.split("@")[0];
    const response = await userLogin({
      usuario: userName,
      contrasenia: data.pwd,
    });
    dispatch(login({ loggedIn: true, token: response.data }));
  };

  // automatically update order status
  useEffect(() => {
    const timeout1 = setTimeout(() => {
      if (orderPaid) {
        dispatch(updateOrderStatus({status: "En Camino"}))
      }
    }, 10000);

    return () => clearTimeout(timeout1);
  }, [orderPaid]);

  useEffect(() => {
    const timeout2 = setTimeout(() => {
      if (orderPaid) {
        if (orderStatus == "En Camino") {
          dispatch(updateOrderStatus({status: "Entregado"}))
        }
      }
    }, 10000);
    return () => clearTimeout(timeout2);
  }, [orderStatus])

  return (
    <ScreenLayout>
      {!isLoggedIn ? (
        <>
          <Text style={tw`text-2xl font-bold `}>Bienvenido!</Text>
          <Text style={tw`w-10/12 pt-5 pb-5 text-center`}>
            A continuación ingrese sus datos para iniciar sesión.
          </Text>
          <View
            style={tw`bg-gray-50 w-10/12 p-10 border border-gray-300 rounded-lg shadow-lg mb-8`}
          >
            <Input
              onChangeText={(value) =>
                setUserData({ ...userData, email: value })
              }
              placeholder="correo"
              errorStyle={{ color: "red" }}
              errorMessage={
                !validate(userData.email) && userData.email.length > 0
                  ? "Ingrese un correo válido"
                  : null
              }
              leftIcon={<Icon name="email" size={24} color="black" />}
            />
            <Input
              onChangeText={(value) => setUserData({ ...userData, pwd: value })}
              placeholder="contraseña"
              secureTextEntry
              errorStyle={{ color: "red" }}
              errorMessage={
                userData.pwd.length > 0 && userData.pwd.length < 6
                  ? "Ingrese una contraseña válida"
                  : null
              }
              leftIcon={<Icon name="lock" size={24} color="black" />}
            />
          </View>
          <Button
            title={"Iniciar sesión"}
            type="outline"
            raised
            disabled={!validate(userData.email) || userData.pwd.length == 0}
            containerStyle={{ width: "80%" }}
            isLoading={isLoading}
            onPress={async () => {
              if (validate(userData.email) && userData.pwd.length > 0) {
                await handleLogin(userData);
              }
            }}
          />
        </>
      ) : (
        <View style={tw`flex-col flex-1 items-center w-full `}>
          <Avatar
            size="xlarge"
            onPress={() => console.log("Works!")}
            imageProps={{
              resizeMode: "contain",
            }}
            source={{
              uri: "https://firebasestorage.googleapis.com/v0/b/antaresfacu-17d20.appspot.com/o/profile_pictures%2Fleodicaprio.jpeg?alt=media&token=6aadb338-5c59-4a35-ab09-130929f6ab0d",
            }}
            rounded
            activeOpacity={0.7}
          />
          <Button
            icon={<Icon name="log-out" type="entypo" size={30} color="white" />}
            containerStyle={{ position: "absolute", right: 20 }}
            onPress={() => dispatch(logout())}
          />
          <View style={tw`h-1/2 px-4 w-full`}>
            <Text style={tw`text-xl h-1/6 font-bold leading-10`}>
              {`Bienvenido, ${getUserFromToken(token).toUpperCase()}`}
            </Text>
            <View style={tw`bg-${orderStatus ? statusColors[orderStatus] + "-200" : "white"} h-5/6`}>
              <Text style={tw`text-lg`}>
                {orderPaid? orderStatus : "No hay órdenes en curso"}
              </Text>
              <View style={tw`flex-1 w-full pb-2`}></View>
            </View>
          </View>
          <View style={tw`flex-1 w-full px-5 py-5`}>
            <View style={tw`mb-3`}>
              <Button
                title={"Pedir"}
                raised
                icon={
                  <Icon
                    name="right"
                    type="ant-design"
                    size={24}
                    color="white"
                  />
                }
                iconRight
                onPress={() => {
                  dispatch(setSelected({ id: 1 })); // seteo que el seleccionado es la pantalla de menu
                  navigation.navigate("MenuScreen");
                }}
              />
            </View>
            {/* <Button
              title={"Ver orden creada"}
              raised
              disabled={Object.keys(orderLines).length == 0}
              onPress={() => {
                dispatch(setSelected({ id: 2 })); // seteo que el seleccionado es la pantalla de orden
                navigation.navigate("OrderScreen");
              }}
            /> */}
          </View>
        </View>
      )}
    </ScreenLayout>
  );
}

export default HomeScreen;
