import { FlatList, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ScreenLayout from "../components/ScreenLayout";
import tw from "tailwind-react-native-classnames";
import { selectOrder, selectProducts } from "../slices/productSlice";
import { Button, Divider, Icon } from "react-native-elements";
import { selectLoginStatus } from "../slices/loginSlice";
import { useNavigation } from "@react-navigation/native";

const OrderScreen = () => {
  const isLoggedIn = useSelector(selectLoginStatus);
  const orderLines = useSelector(selectOrder);
  const products = useSelector(selectProducts);
  const navigation = useNavigation();
  const [subTotal, setSubTotal] = useState(0);
  const [total, setTotal] = useState(0);

  const envio = 90;

  useEffect(() => {
    calculateSubTotal();
    calculateTotal();
  }, [orderLines, subTotal]);

  const calculateSubTotal = () => {
    if (Object.keys(orderLines).length > 0) {
      let subTotal = 0;
      for (const tuple of Object.entries(orderLines)) {
        subTotal += products.productList[tuple[0]].price * tuple[1];
      }
      setSubTotal(subTotal);
    } else {
      setSubTotal(0);
    }
  };

  const calculateTotal = () => {
    setTotal(subTotal + envio);
  };

  const renderItem = ({ item }) => {
    return (
      <View style={tw`flex-row p-4 justify-between`}>
        <Text>{products.productList[item[0]].title}</Text>
        <Text>cantidad: {item[1]}</Text>
        <Text>precio: {products.productList[item[0]].price * item[1]}</Text>
      </View>
    );
  };

  return (
    <ScreenLayout>
      {isLoggedIn ? (
        <View style={tw`flex-col flex-1 items-center w-full `}>
          {Object.keys(orderLines).length > 0 ? (
            <>
              <View style={tw`h-5/6 w-full`}>
                <View style={tw`p-3`}>
                  <Text style={tw`font-bold text-xl`}>Resumen de orden:</Text>
                </View>
                <View style={tw`flex-1 p-2`}>
                  <FlatList
                    data={Object.entries(orderLines)}
                    renderItem={renderItem}
                    keyExtractor={(item) => item[0]}
                    ItemSeparatorComponent={() => (
                      <Divider orientation="horizontal" />
                    )}
                  />
                </View>
              </View>
              <View style={tw`h-1/6 w-full`}>
                <View style={tw`py-2`}>
                  <Divider width={3} orientation="horizontal" />
                </View>
                <View style={tw`flex-row items-start pl-2`}>
                  <View style={tw` w-1/3`}>
                    <View style={tw`flex-row`}>
                      <Text style={tw`w-20`}>Subtotal:</Text>
                      <Text>${subTotal}</Text>
                    </View>
                    <View style={tw`flex-row`}>
                      <Text style={tw`w-20 `}>Envío:</Text>
                      <Text>${envio}</Text>
                    </View>
                    <View style={tw`flex-row`}>
                      <Text style={tw`text-lg font-bold w-20`}>Total:</Text>
                      <Text style={tw`text-lg font-bold`}>${total}</Text>
                    </View>
                  </View>
                  <View
                    style={tw`flex-col flex-1 justify-center ml-2 mr-2 h-20`}
                  >
                    <Button buttonStyle={tw`rounded-full`} title={"Pagar"} />
                  </View>
                </View>
              </View>
            </>
          ) : (
            <Text style={tw`text-xl`}>La orden se encuentra vacía</Text>
          )}
        </View>
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

export default OrderScreen;

const styles = StyleSheet.create({});
