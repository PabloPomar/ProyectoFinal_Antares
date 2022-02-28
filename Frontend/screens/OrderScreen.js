import { FlatList, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ScreenLayout from "../components/ScreenLayout";
import tw from "tailwind-react-native-classnames";
import { selectOrder, selectProducts } from "../slices/productSlice";
import { Divider } from "react-native-elements";

const OrderScreen = () => {
  const orderLines = useSelector(selectOrder);
  const products = useSelector(selectProducts);
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
              <View style={tw`items-end pr-2`}>
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
              </View>
            </View>
          </>
        ) : (
          <Text style={tw`text-xl`}>La orden se encuentra vacía</Text>
        )}
      </View>
    </ScreenLayout>
  );
};

export default OrderScreen;

const styles = StyleSheet.create({});
