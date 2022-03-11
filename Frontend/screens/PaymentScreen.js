import {
  FlatList,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ScreenLayout from "../components/ScreenLayout";
import tw from "tailwind-react-native-classnames";
import { selectOrder, selectProducts } from "../slices/productSlice";
import { Button, Divider, Icon, Card } from "react-native-elements";
import { selectLoginStatus } from "../slices/loginSlice";
import { useNavigation } from "@react-navigation/native";
import { selectPaymentMethods } from "../slices/paymentMethodsSlice";

const PaymentScreen = () => {
  const isLoggedIn = useSelector(selectLoginStatus);
  const paymentMethods = useSelector(selectPaymentMethods);
  const navigation = useNavigation()

  return (
    <ScreenLayout>
      {isLoggedIn ? (
        <View style={tw`flex-1 w-full`}>
          <ScrollView>
              {paymentMethods ? Object.keys(paymentMethods).map((key) => (
                  <Card key={key}>
                      <View>
                          <Icon name={paymentMethods[key].icon} type={paymentMethods[key].type}/>
                      </View>
                  </Card>
              )) : null}
          </ScrollView>
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

export default PaymentScreen;
