import { useNavigation } from "@react-navigation/native";
import {
  StyleSheet,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import { Card, Icon } from "react-native-elements";
import { FAB } from "react-native-paper";
import { useSelector } from "react-redux";
import tw from "tailwind-react-native-classnames";
import ScreenLayout from "../components/ScreenLayout";
import { selectLoginStatus } from "../slices/loginSlice";
import { selectProducts } from "../slices/productSlice";

function MenuScreen() {
  const isLoggedIn = useSelector(selectLoginStatus);
  const products = useSelector(selectProducts);
  const navigation = useNavigation();

  return (
    <ScreenLayout>
      {isLoggedIn ? (
        <>
          <View style={tw`flex-1 w-full`}>
            <View style={tw`flex-row justify-between`}>
              <Text style={tw`text-xl font-bold p-2`}>
                ¿Qué desea pedir hoy?
              </Text>
            </View>
            <View style={tw`flex-1 flex-col pt-3`}>
              <ScrollView style={tw`mb-2`} nestedScrollEnabled={true}>
                {products?.productList.map((item) => (
                  <Card key={item.id}>
                    <View style={tw`flex-row`}>
                      {/* IMAGE */}
                      <Card.Image
                        style={tw`w-28`}
                        resizeMode="contain"
                        source={{ uri: item.imageURL }}
                      />
                      {/* CONTENT */}
                      <View style={styles.cardContent}>
                        <Text style={tw`font-bold text-lg`}>{item.title}</Text>
                        <Text style={tw`italic pt-0 text-xs pb-1`}>
                          {item.subtitle}
                        </Text>
                        <ScrollView>
                          <Text style={tw`text-xs w-60`}>{item.desc}</Text>
                        </ScrollView>
                      </View>
                    </View>
                  </Card>
                ))}
              </ScrollView>
            </View>
          </View>
          <FAB
            style={styles.fab}
            small
            label="Agregar al pedido"
            icon="plus"
            onPress={() => console.log("Pressed")}
          />
        </>
      ) : (
        <View style={tw`flex-1 `}>
          <TouchableOpacity
            onPress={() => navigation.navigate("HomeScreen")}
            style={tw`bg-black p-4 m-2 rounded shadow`}
          >
            <Text style={tw`text-white`}>Login requerido</Text>
            <Icon name="arrowleft" type="ant-design" color={"white"} />
          </TouchableOpacity>
        </View>
      )}
    </ScreenLayout>
  );
}

export default MenuScreen;

const styles = StyleSheet.create({
  fab: {
    position: "absolute",
    margin: 3,
    right: 3,
    bottom: 3,
    backgroundColor: "#000",
  },
  cardContent: {
    flexDirection: "column",
    height: 200,
  },
});
