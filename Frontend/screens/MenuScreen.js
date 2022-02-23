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
import InputSpinner from "react-native-input-spinner";
import { useDispatch, useSelector } from "react-redux";
import tw from "tailwind-react-native-classnames";
import ScreenLayout from "../components/ScreenLayout";
import { selectLoginStatus } from "../slices/loginSlice";
import {
  addToRemoveFromCart,
  selectOrder,
  selectProducts,
} from "../slices/productSlice";

function MenuScreen() {
  const isLoggedIn = useSelector(selectLoginStatus);
  const products = useSelector(selectProducts);
  const selectedProducts = useSelector(selectOrder);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  return (
    <ScreenLayout>
      {isLoggedIn ? (
        <>
          <View style={tw`flex-1 w-full`}>
            <View style={tw`flex-row justify-between`}>
              <Text style={tw`text-xl font-bold p-2 pt-0`}>
                ¿Qué desea pedir hoy?
              </Text>
            </View>
            <View style={tw`flex-1 flex-col pt-3`}>
              <ScrollView style={tw`mb-2`} nestedScrollEnabled={true}>
                {Object.keys(products?.productList).map((key) => (
                  <Card key={products.productList[key].id}>
                    <View style={tw`flex-row`}>
                      {/* IMAGE */}
                      <Card.Image
                        style={tw`w-28`}
                        resizeMode="contain"
                        source={{ uri: products.productList[key].imageURL }}
                      />
                      {/* CONTENT */}
                      <View style={styles.cardContent}>
                        <View style={tw`flex-row justify-between`}>
                          <Text style={tw`font-bold text-lg`}>
                            {products.productList[key].title}
                          </Text>
                          {/* counter */}
                          <InputSpinner
                            max={4}
                            min={0}
                            step={1}
                            colorMax={"red"}
                            color={"blue"}
                            colorMin={"black"}
                            value={products.productList[key].quantity}
                            onChange={(num) => {
                              console.log(num, key);
                              dispatch(
                                addToRemoveFromCart({ id: key, quantity: num })
                              );
                            }}
                            buttonStyle={tw`w-8 h-8`}
                            buttonTextStyle={tw`leading-7`}
                            buttonFontSize={22}
                            style={tw`flex-row items-center`}
                          />
                        </View>

                        <Text style={tw`italic pt-0 text-xs pb-1`}>
                          {products.productList[key].subtitle}
                        </Text>
                        <ScrollView>
                          <Text style={tw`text-xs w-60`}>
                            {products.productList[key].desc}
                          </Text>
                        </ScrollView>
                      </View>
                    </View>
                  </Card>
                ))}
              </ScrollView>
            </View>
          </View>
          <FAB
            style={Object.keys(selectedProducts).length == 0 ? styles.fabDisabled : styles.fab}
            small
            animated
            disabled={Object.keys(selectedProducts).length == 0}
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
    backgroundColor: "black",
    elevation: 3
  },
  fabDisabled: {
    position: "absolute",
    margin: 3,
    right: 3,
    bottom: 3,
    backgroundColor: "#ebecec",
    elevation: 3
  },
  cardContent: {
    flexDirection: "column",
    height: 200,
  },
});
