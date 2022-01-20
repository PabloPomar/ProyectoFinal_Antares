import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { Button, Tab, TabView, ThemeProvider } from "react-native-elements";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useColorScheme } from "react-native";
import { useState } from "react";

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
      <Tab
        value={index}
        onChange={(e) => setIndex(e)}
        indicatorStyle={{
          backgroundColor: "white",
          height: 3,
        }}
        variant="default"
      >
        <Tab.Item
          title="Home"
          titleStyle={styles.tabItemTitle}
          icon={{ name: "home", type: "ionicon", color: "black" }}
        />
        <Tab.Item
          title="favorite"
          titleStyle={styles.tabItemTitle}
          icon={{ name: "heart", type: "ionicon", color: "black" }}
        />
        <Tab.Item
          title="Recent"
          titleStyle={styles.tabItemTitle}
          icon={{ name: "timer", type: "ionicon", color: "black" }}
        />
      </Tab>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  tabViewItems: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: '100%',
    backgroundColor: 'rgb(53,53,80)'
  },
  tabItemTitle: {
    fontSize: 12,
    color: "black",
  },
});
