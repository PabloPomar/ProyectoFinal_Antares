import { useNavigation } from "@react-navigation/native";
import {
  StyleSheet,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Card, Icon } from "@rneui/themed";
import { FAB } from "react-native-paper";
import InputSpinner from "react-native-input-spinner";
import { useDispatch, useSelector } from "react-redux";
import tw from "tailwind-react-native-classnames";
import ScreenLayout from "../components/ScreenLayout";
import { selectLoginStatus } from "../slices/loginSlice";
import {
  addToRemoveFromSelection,
  createOrder,
  selectProductSelection,
  selectProductsByType,
  selectType,
} from "../slices/productSlice";
import { setSelected } from "../slices/navOptionsSlice";
import FoodDropdown from "../components/FoodDropdown";

function MenuScreen() {
  const isLoggedIn = useSelector(selectLoginStatus);
  const type = useSelector(selectType);
  const products = useSelector((state) => selectProductsByType(state, type));
  const selectedProducts = useSelector(selectProductSelection);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  return (
    <ScreenLayout>
      {isLoggedIn ? (
        <>
          <View style={tw`flex-1 w-full`}>
            <View style={tw`flex-row`}>
              <Text style={tw`text-xl font-bold pt-3`}>
                ¿Qué desea pedir hoy?
              </Text>
              <View style={tw`w-44`}>
                <FoodDropdown />
              </View>
            </View>
            <View style={tw`flex-1 flex-col pt-3`}>
              <ScrollView style={tw`mb-2`} nestedScrollEnabled={true}>
                {Object.keys(products).map((key) => (
                  <Card key={products[key].id}>
                    <View style={tw`flex-row`}>
                      {/* IMAGE */}
                      <Card.Image
                        style={tw`w-24`}
                        resizeMode="contain"
                        source={{ uri: products[key].imageURL }}
                      />
                      {/* CONTENT */}
                      <View style={styles.cardContent}>
                        <View style={tw`flex-row justify-between pr-3`}>
                          <Text style={tw`font-bold text-lg`}>
                            {products[key].title}
                          </Text>
                          {/* counter */}
                          <InputSpinner
                            max={4}
                            min={0}
                            step={1}
                            colorMax={"red"}
                            color={"blue"}
                            colorMin={"black"}
                            value={selectedProducts[products[key].id] || 0}
                            onChange={(num) => {
                              dispatch(
                                addToRemoveFromSelection({ id: products[key].id, quantity: num })
                              );
                            }}
                            buttonStyle={tw`w-8 h-8`}
                            buttonTextStyle={tw`leading-7`}
                            buttonFontSize={22}
                            style={tw`flex-row items-center`}
                          />
                        </View>

                        <Text style={tw`italic pt-0 text-xs pb-1`}>
                          {products[key].subtitle}
                        </Text>
                        <ScrollView>
                          <Text style={tw`text-xs w-60`}>
                            {products[key].desc}
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
            big
            animated
            disabled={Object.keys(selectedProducts).length == 0}
            icon="arrow-right"
            onPress={() => {
              dispatch(setSelected({id: 2})) // se selecciona la pantalla de order
              dispatch(createOrder())
              navigation.navigate("OrderScreen")
            }}
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
