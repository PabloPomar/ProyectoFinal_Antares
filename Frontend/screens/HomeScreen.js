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
  selectOrderId,
  selectOrderPaid,
  selectOrderStatus,
  updateOrderStatus,
} from "../slices/orderSlice";
import { statusColors } from "../utils";
import { LinearProgress } from "@rneui/base";
import { IconButton } from "react-native-paper";

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

  const orderIdFromBack = useSelector(selectOrderId);

  const getOrderStatusFromBE = async () => {
    console.log("orderIdFromBack: ", orderIdFromBack);
    let res = await fetch(
      "https://ddae-190-244-188-46.ngrok.io/api/v1/Pedido/getEstado?idPedido=" +
        orderIdFromBack
    );
    res = await res.text();
    console.log(res);
    dispatch(updateOrderStatus({ status: res }));
  };

  const handleLogin = async (data) => {
    let userName = data.email.split("@")[0];
    const response = await userLogin({
      usuario: userName,
      contrasenia: data.pwd,
    });
    dispatch(login({ loggedIn: true, token: response.data }));
  };

  // automatically get order status

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
            onPress={() => console.log("avatar")}
            imageProps={{
              resizeMode: "contain",
            }}
            source={{
              uri: "https://firebasestorage.googleapis.com/v0/b/antaresfacu-17d20.appspot.com/o/profile_pictures%2Fuser-pic-circle.png?alt=media&token=b55ac671-e501-4660-a7a3-739e54c93546",
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
            <View
              style={tw`bg-${
                orderStatus ? `${statusColors[orderStatus].color}-200` : "white"
              } h-5/6 border border-gray-300 rounded-xl shadow-xl mb-8`}
            >
              {orderPaid ? (
                <View style={tw`p-3`}>
                  <View style={tw`flex-row justify-between`}>
                    <Text style={tw`text-lg font-bold pb-3`}>
                      Estado de la orden:
                    </Text>
                    <IconButton
                      icon="refresh"
                      color={"blue"}
                      animated
                      size={30}
                      onPress={() => {
                        console.log("Fetching order state...");
                        getOrderStatusFromBE();
                      }}
                    />
                  </View>
                  {orderStatus == "Entregado" || orderStatus == "Finalizado" ? (
                    <Text style={tw`text-lg`}>Pedido entregado!</Text>
                  ) : orderStatus == "Pagado" ? (
                    <Text style={tw`text-lg`}>Pedido pagado...</Text>
                  ) : orderStatus == "Preparando" ? (
                    <Text style={tw`text-lg`}>
                      Pedido está siendo preparado...
                    </Text>
                  ) : orderStatus == "EnCamino" ? (
                    <Text style={tw`text-lg`}>Pedido en camino...</Text>
                  ) : (
                    <Text style={tw`text-lg`}>Pedido en curso...</Text>
                  )}
                  <LinearProgress
                    value={statusColors[orderStatus].progress}
                    variant="determinate"
                    color={statusColors[orderStatus].color}
                  />
                  {orderStatus == "Entregado" || orderStatus == "Finalizado" ? (
                    <View>
                      <Text style={tw`pt-2`}>Disfrute de su orden!</Text>
                      <Icon
                        name="checkcircle"
                        type="antdesign"
                        style={tw`p-2`}
                        size={60}
                        color={(orderStatus != "Entregado" && orderStatus != "Finalizado") ? "grey" : "green"}
                        disabled={orderStatus != "Entregado" && orderStatus != "Finalizado"}
                        disabledStyle={{ backgroundColor: "white" }}
                      />
                    </View>
                  ) : null}
                </View>
              ) : (
                <View style={tw`p-3`}>
                  <Text style={tw`text-lg`}>No hay órdenes en curso</Text>
                </View>
              )}
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
          </View>
        </View>
      )}
    </ScreenLayout>
  );
}

export default HomeScreen;
