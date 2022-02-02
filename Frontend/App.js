// import 'react-native-gesture-handler';
// import { StatusBar } from "expo-status-bar";
// import { StyleSheet, Text, View } from "react-native";
// import { TabView, ThemeProvider } from "react-native-elements";
// import { useColorScheme } from "react-native";
// import { useState } from "react";
// import BottomBar from "./components/BottomBar/BottomBar";
// import { styles } from "./constants/styles";

// const theme = {
//   Button: {
//     raised: true,
//   },
// };

// export default function App() {
//   const [index, setIndex] = useState(0);
//   let colorScheme = useColorScheme();

//   return (
//     <ThemeProvider theme={theme} useDark={colorScheme === "dark"}>
//       <TabView value={index} onChange={setIndex} animationType="spring">
//         <TabView.Item
//           style={styles.tabViewItems}
//         >
//           <Text h1>Home</Text>
//         </TabView.Item>
//         <TabView.Item
//           style={styles.tabViewItems}
//         >
//           <Text h1>Favorite</Text>
//         </TabView.Item>
//         <TabView.Item
//           style={styles.tabViewItems}
//         >
//           <Text h1>Recent</Text>
//         </TabView.Item>
//       </TabView>
//       <BottomBar changeFunc={setIndex} pos={index}/>
//     </ThemeProvider>
//   );
// }
// In App.js in a new project

import React, { useRef, useState } from "react";
import {
  Button,
  DrawerLayoutAndroid,
  Text,
  View,
  Modal,
  Pressable,
  FlatList,
} from "react-native";
import { Icon } from "react-native-elements";
import { styles } from "./constants/styles";

const App = () => {
  const drawer = useRef(null);
  const [drawerPosition, setDrawerPosition] = useState("left");
  const [modalVisible, setModalVisible] = useState(false);
  const changeDrawerPosition = () => {
    if (drawerPosition === "left") {
      setDrawerPosition("right");
    } else {
      setDrawerPosition("left");
    }
  };

  const NavOption = ({ title }) => (
    <View style={styles.navOptionView}>
      <Text style={styles.boldText}>{title}</Text>
    </View>
  );

  const renderItem = ({ item }) => (
    <NavOption title={item.title} />
  );

  const navigationView = () => (
    <View style={[styles.container, styles.navigationContainer]}>
      <Icon
        name="close"
        type="ant-design"
        onPress={() => drawer.current.closeDrawer()}
      />
      <FlatList 
        data={[{id:1, title: "ABM1"},{id:2, title: "ABM2"},{id:3, title: "ABM3"}]}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </View>
  );

  return (
    <DrawerLayoutAndroid
      ref={drawer}
      drawerWidth={300}
      drawerPosition={drawerPosition}
      renderNavigationView={navigationView}
    >
      <View style={styles.screen}>
        {/* Abrir y cerrar menu, configuración */}
        <View
          style={{
            paddingLeft: 10,
            paddingRight: 10,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Icon
            name="menu"
            type="entypo"
            size={40}
            onPress={() => drawer.current.openDrawer()}
          />
          {/* boton para mostrar u ocultar modal */}
          <Icon
            raised
            name="cog"
            type="font-awesome"
            onPress={() => setModalVisible(true)}
          />
        </View>

        {/* Modal */}
        <View style={styles.centeredView}>
          <Modal
            animationType="fade"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              setModalVisible(!modalVisible);
            }}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Text style={styles.boldText}>
                  Cambiar la posición del menú
                </Text>
                <Text style={styles.paragraph}>
                  El menú se abre actualmente desde la
                  <Text style={styles.boldText}>{drawerPosition == "left" ? " izquierda" : " derecha"}</Text>
                </Text>
                <Button
                  title="Change Drawer Position"
                  onPress={() => changeDrawerPosition()}
                />

                {/* boton que cierra modal */}
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => setModalVisible(!modalVisible)}
                >
                  <Text style={styles.textStyle}>Cerrar</Text>
                </Pressable>
              </View>
            </View>
          </Modal>
          {/* Fin de modal */}
        </View>
      </View>
    </DrawerLayoutAndroid>
  );
};

export default App;
