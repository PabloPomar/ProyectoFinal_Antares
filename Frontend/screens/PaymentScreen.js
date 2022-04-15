import {
  FlatList,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ScreenLayout from "../components/ScreenLayout";
import tw from "tailwind-react-native-classnames";
import { selectOrder } from "../slices/productSlice";
import { Button, Icon, Card, Overlay, Input } from "@rneui/themed";
import { selectLoginStatus } from "../slices/loginSlice";
import { useNavigation } from "@react-navigation/native";
import {
  getSelectedPaymentMethod,
  removeSelection,
  selectCard,
  selectPaymentMethods,
} from "../slices/paymentMethodsSlice";

const PaymentScreen = () => {
  const isLoggedIn = useSelector(selectLoginStatus);
  const paymentMethods = useSelector(selectPaymentMethods);
  const orderLines = useSelector(selectOrder);
  const selectedPaymentMethod = useSelector(getSelectedPaymentMethod);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [visible, setVisible] = useState(false);
  const [cvv, setCvv] = useState("");
  const [paying, setPaying] = useState(false);

  const toggleOverlay = () => {
    setVisible(!visible);
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
       setPaying(false);
     }, 3000);
 
    return () => clearTimeout(timeout);
   },[paying]);

  return (
    <ScreenLayout>
      {isLoggedIn ? (
        Object.keys(orderLines).length > 0 ? (
          <>
            <Overlay
              isVisible={visible}
              onBackdropPress={() => {
                toggleOverlay();
                dispatch(removeSelection());
              }}
              overlayStyle={tw`w-60`}
            >
              <Text>Ingrese el código de seguridad de la tarjeta</Text>
              <Input
                placeholder="CVV"
                secureTextEntry={true}
                onChangeText={(data) => {
                  setCvv(data);
                }}
              />
              <View style={tw`flex-row justify-between`}>
                <TouchableOpacity
                  onPress={() => {
                    toggleOverlay();
                    dispatch(removeSelection());
                  }}
                >
                  <Icon name="closecircle" type="antdesign" style={tw`p-2`} />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    if (!(cvv.length < 3 || cvv.length > 4)) {
                      toggleOverlay();
                    }
                  }}
                >
                  <Icon
                    name="checkcircle"
                    type="antdesign"
                    style={tw`p-2`}
                    color={cvv.length < 3 || cvv.length > 4 ? "grey" : "green"}
                    disabled={cvv.length < 3}
                    disabledStyle={{ backgroundColor: "white" }}
                  />
                </TouchableOpacity>
              </View>
            </Overlay>

            <View style={tw`h-80 w-80`}>
              <Text style={tw`font-bold text-xl`}>Elija un medio de pago</Text>
              <ScrollView>
                {paymentMethods
                  ? Object.keys(paymentMethods).map((key) => (
                      <TouchableOpacity
                        key={key}
                        onPress={() => {
                          dispatch(selectCard({ id: paymentMethods[key].id }));
                          toggleOverlay();
                        }}
                      >
                        <Card
                          containerStyle={tw`${
                            paymentMethods[key].selected ? "bg-gray-100" : null
                          }`}
                        >
                          <View style={tw`flex-row justify-evenly`}>
                            <Icon
                              name={paymentMethods[key].icon}
                              type={paymentMethods[key].type}
                            />
                            <Text>{paymentMethods[key].desc}</Text>
                          </View>
                        </Card>
                      </TouchableOpacity>
                    ))
                  : null}
              </ScrollView>
            </View>
            <View style={tw`flex-1 w-80 justify-center items-center`}>
              <Button
                mode="contained"
                buttonStyle={tw`p-4`}
                disabled={selectedPaymentMethod.length == 0}
                title="PAGAR"
                loading={paying}
                onPress={() => setPaying(true)}
              />
            </View>
          </>
        ) : (
          <Text style={tw`text-xl`}>No hay orden creada.</Text>
        )
      ) : (
        <View style={tw`flex-1 `}>
          <TouchableOpacity
            onPress={() => navigation.navigate("HomeScreen")}
            style={tw`bg-black p-4 m-2 rounded shadow`}
          >
            <Text style={tw`text-white`}>Login requerido</Text>
            <Icon name="arrowleft" type="ant-design" color={"white"} />
          </TouchableOpacity>
        </View>
      )}
    </ScreenLayout>
  );
};

export default PaymentScreen;
