import React from "react";
import { Overlay } from "@rneui/themed";
import { View, Text, StyleSheet } from "react-native";
import { OpenURLButton } from "./UrlButton";

const OverlayComponent = ({ visible, toggleOverlay }) => {
  return (
    <View>
      <Overlay isVisible={visible} onBackdropPress={toggleOverlay}>
        <Text style={styles.textPrimary}>Configuración</Text>
        <Text style={styles.textSecondary}>Ayuda de la aplicación</Text>
        <OpenURLButton
          url={
            "https://firebasestorage.googleapis.com/v0/b/antaresfacu-17d20.appspot.com/o/pdf_help%2FAyuda_Web.pdf?alt=media&token=a267d886-08f8-4e29-a3a9-d7b6f4e1ee53"
          }
        >
          Ir a ayuda
        </OpenURLButton>
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
