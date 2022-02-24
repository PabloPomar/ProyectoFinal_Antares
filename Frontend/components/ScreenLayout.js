import { View, Text, SafeAreaView, Image } from "react-native";
import tw from "tailwind-react-native-classnames";
import React from "react";
import NavOptions from "./NavOptions";

const ScreenLayout = ({ children, ...props }) => {
  return (
    <SafeAreaView style={tw`bg-white h-full`}>
      <View style={tw`flex-grow items-center`}>
        <Image
          style={{
            width: 150,
            height: 150,
            resizeMode: "contain",
          }}
          source={require("../assets/logo_antares_sinbackground.png")}
        />
        {children}
      </View>
      <NavOptions />
    </SafeAreaView>
  );
};

export default ScreenLayout;
