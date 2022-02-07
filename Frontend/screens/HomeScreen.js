import React, { useState, useCallback } from "react";
import { Text, View, StyleSheet, Image, Linking } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { Input, Button } from "react-native-elements";


const antaresURL = "https://www.cervezaantares.com/";

const OpenURLButton = ({ url, children }) => {
  const handlePress = useCallback(async () => {
    // Checking if the link is supported for links with custom URL scheme.
    const supported = await Linking.canOpenURL(url);

    if (supported) {
      // Opening the link with some app, if the URL scheme is "http" the web link should be opened
      // by some browser in the mobile
      await Linking.openURL(url);
    } else {
      Alert.alert(`Don't know how to open this URL: ${url}`);
    }
  }, [url]);

  return <Button title={children} onPress={handlePress} />;
};

function HomeScreen() {
  const [error, setError] = useState("");

  return (
    <View style={styles.screen}>
      <Image
        style={styles.logo}
        source={require("../assets/logo_antares.png")}
      />
      <View style={styles.title}>
        <Text style={styles.importantText}>Bienvenido!</Text>
      </View>
      <View style={styles.content}>
        <View style={styles.loginForm}>
          <Input
            placeholder="Email"
            leftIcon={<Icon name="user" size={24} color="black" />}
          />

          <Input
            placeholder="Password"
            secureTextEntry
            leftIcon={{ type: "font-awesome", name: "lock" }}
            // onChangeText={(value) => setError("algun error")}
            errorStyle={{ color: "red" }}
            errorMessage="algun error"
          />

          <Button title={"Login"}/>
        </View>

        <View style={styles.linkButton}>
            <OpenURLButton url={antaresURL}>Visita nuestra página web</OpenURLButton>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    height: "100%",
    backgroundColor: "white",
  },
  title: {
    textAlign: "center",
  },
  content: {
    flexDirection: "column",
    width: "80%",
    height: "95%"
  },
  loginForm: {
    height:"50%",
    marginTop: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  linkButton: {
    marginTop: 50,  
    justifyContent: "flex-end"
  },
  logo: {
    margin: 20,
    width: 110,
    height: 60,
  },
  importantText: {
    fontSize: 25,
    fontWeight: "bold",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});

export default HomeScreen;
