import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Image,
  FlatList,
} from "react-native";
import { Icon } from "react-native-elements";
import { useDispatch } from "react-redux";
import tw from "tailwind-react-native-classnames";
import { OpenURLButton } from "../components/UrlButton";
import { setData } from "../slices/navSlice";

const antaresURL = "https://www.cervezaantares.com/";
const menuOptions = [
  {
    id: "1",
    name: "HomeScreen",
    type: "antdesign",
    icon: "home",
  },
  {
    id: "2",
    name: "AnotherScreen",
    type: "antdesign",
    icon: "home",
  },
];

function HomeScreen() {
  const navigation = useNavigation();
  const dispatch = useDispatch()

  return (
    <SafeAreaView style={tw`bg-white h-full`}>
      <View style={tw`h-5/6 mb-20 items-center`}>
        <Image
          style={{
            width: 200,
            height: 200,
            resizeMode: "contain",
          }}
          source={require("../assets/logo_antares.png")}
        />
        <Text>HomeScreen</Text>
      </View>

      <View style={tw`border-t border-gray-200 flex-grow `}>
        <FlatList
          data={menuOptions}
          keyExtractor={(item) => item.id}
          horizontal
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate(item.name)} }
            >
              <Icon
                name={item.icon}
                type={item.type}
                color={"white"}
                style={tw`p-2 bg-black rounded-full w-10 mt-4`}
              />
            </TouchableOpacity>
          )}
        />
      </View>
    </SafeAreaView>
  );
}

export default HomeScreen;
