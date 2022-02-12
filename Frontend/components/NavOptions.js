import { View, Text, FlatList, TouchableOpacity } from "react-native";
import React from "react";
import tw from "tailwind-react-native-classnames";
import { Icon } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";

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
    type: "entypo",
    icon: "text-document",
  },
];

const NavOptions = () => {
  const navigation = useNavigation();
  return (
    <View style={tw`border-t border-gray-200 flex-grow `}>
      <FlatList
        data={menuOptions}
        keyExtractor={(item) => item.id}
        horizontal
        renderItem={({ item }) => (
          <TouchableOpacity
            style={tw`pl-3 pr-3`}
            onPress={() => {
              navigation.navigate(item.name);
            }}
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
  );
};

export default NavOptions;
