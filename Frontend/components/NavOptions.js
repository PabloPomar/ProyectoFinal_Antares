import { View, Text, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import React, { useState } from "react";
import tw from "tailwind-react-native-classnames";
import { Icon } from "@rneui/themed";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import {
  selectInitialNavOptions,
  selectNavOptions,
  setSelected,
} from "../slices/navOptionsSlice";
import { createOrder } from "../slices/productSlice";
import { selectLoginStatus } from "../slices/loginSlice";
import OverlayComponent from "./HelpModal";

const NavOptions = () => {
  const menuOptions = useSelector(selectNavOptions);
  const initialMenuOptions = useSelector(selectInitialNavOptions);
  const isLoggedIn = useSelector(selectLoginStatus);
  const dispatch = useDispatch(setSelected);
  const navigation = useNavigation();

  // MODAL DE AYUDA
  const [visible, setVisible] = useState(false);

  const toggleOverlay = () => {
    setVisible(!visible);
  };


  return (
    <View style={tw`border-t border-gray-300 bg-white w-full pb-2 `}>
      <OverlayComponent visible={visible} toggleOverlay={toggleOverlay} />
      <FlatList
        data={
          isLoggedIn
            ? Object.entries(menuOptions)
            : Object.entries(initialMenuOptions)
        }
        keyExtractor={(item) => item[0]}
        horizontal
        renderItem={({ item }) => (
          <TouchableOpacity
            style={tw`pl-3 pr-3`}
            onPress={() => {
              dispatch(setSelected({ id: item[1].id }));
              if (item[1].name == "OrderScreen") {
                dispatch(createOrder());
              }
              navigation.navigate(item[1].name);
            }}
          >
            <Icon
              name={item[1].icon}
              type={item[1].type}
              color={"white"}
              style={tw`p-2 ${
                item[1].selected ? "bg-gray-400" : "bg-black"
              } rounded-full w-10 mt-4`}
            />
          </TouchableOpacity>
        )}
      />
      <TouchableOpacity
        style={styles.HelpIcon}
        onPress={() => {
          setVisible(!visible)
        }}
      >
        <Icon
          name={"cog"}
          type={"font-awesome-5"}
          color={"white"}
          style={tw`p-2 bg-blue-500 rounded-full w-10 mt-4`}
        />
      </TouchableOpacity>
    </View>
  );
};

export default NavOptions;


const styles = StyleSheet.create({
  HelpIcon: {
    paddingLeft: 3,
    paddingRight: 3,
    position: "absolute",
    right: 3,
    bottom: 10
  }
})
