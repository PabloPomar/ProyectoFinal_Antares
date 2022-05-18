import React, { useState } from "react";
import { Button, Overlay, Icon } from "@rneui/themed";
import { View, Text, StyleSheet } from "react-native";
import tw from "tailwind-react-native-classnames";

const OverlayComponent = ({visible, toggleOverlay}) => {

  return (
    <View>
      <Overlay isVisible={visible} onBackdropPress={toggleOverlay}>
        <Text style={styles.textPrimary}>Ayuda</Text>
        <Text style={styles.textSecondary}>
          Ayuda de la aplicación
        </Text>
      </Overlay>
    </View>
  );
};

const styles = StyleSheet.create({
  textPrimary: {
    marginVertical: 20,
    textAlign: "center",
    fontSize: 20,
  },
  textSecondary: {
    marginBottom: 10,
    textAlign: "center",
    fontSize: 17,
  },
});

export default OverlayComponent;
