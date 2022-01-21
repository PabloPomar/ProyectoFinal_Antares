import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { TabView, ThemeProvider } from "react-native-elements";
import { useColorScheme } from "react-native";
import { useState } from "react";
import BottomBar from "./components/BottomBar/BottomBar";
import { styles } from "./constants/styles";

const theme = {
  Button: {
    raised: true,
  },
};

export default function App() {
  const [index, setIndex] = useState(0);
  let colorScheme = useColorScheme();

  return (
    <ThemeProvider theme={theme} useDark={colorScheme === "dark"}>
      <TabView value={index} onChange={setIndex} animationType="spring">
        <TabView.Item
          style={styles.tabViewItems}
        >
          <Text h1>Home</Text>
        </TabView.Item>
        <TabView.Item
          style={styles.tabViewItems}
        >
          <Text h1>Favorite</Text>
        </TabView.Item>
        <TabView.Item
          style={styles.tabViewItems}
        >
          <Text h1>Recent</Text>
        </TabView.Item>
      </TabView>
      <BottomBar changeFunc={setIndex} pos={index}/>
    </ThemeProvider>
  );
}
