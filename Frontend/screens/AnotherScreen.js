import { useNavigation } from "@react-navigation/native";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Icon } from "react-native-elements";
import { useSelector } from "react-redux";
import tw from "tailwind-react-native-classnames";
import ScreenLayout from "../components/ScreenLayout";
import { selectLoginStatus } from "../slices/loginSlice";
import { DataTable } from "react-native-paper";
import { useEffect, useState } from "react";

const optionsPerPage = [2, 3, 4];

function AnotherScreen() {
  const isLoggedIn = useSelector(selectLoginStatus);
  const navigation = useNavigation();
  const [page, setPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(optionsPerPage[0]);
  const [abmData, setAbmData] = useState({
    tableHead: ["Name", "Email", "Age"],
    tableData: [
      { id: 1, name: "Josh", email: "josh@gg.com", age: 33 },
      { id: 2, name: "John", email: "john@gg.com", age: 24 },
      { id: 3, name: "Juan", email: "juan@gg.com", age: 25 },
      { id: 4, name: "Flor", email: "flor@gg.com", age: 31 },
      { id: 5, name: "Vicky", email: "vik@gg.com", age: 29 },
      { id: 6, name: "Gena", email: "gena@gg.com", age: 26 },
      { id: 7, name: "Gabs", email: "gabs@gg.com", age: 30 },
    ],
  });
  const from = page * itemsPerPage;
  const to = Math.min((page + 1) * itemsPerPage, abmData.tableData.length);
  
  useEffect(() => {
    setPage(0);
  }, [itemsPerPage]);

  const addData = () => {
    // datos para probar random
    setAbmData({
      ...abmData,
      tableData: [
        ...abmData.tableData,
        {
          id: abmData.tableData.length + 1,
          name: `Pab`,
          email: `pablito@gmail.com`,
          age: 33,
        },
      ],
    });
  };

  const getRows = () => {
    return abmData.tableData.map((data) => (
      <DataTable.Row key={data.id}>
        <DataTable.Cell>{data.name}</DataTable.Cell>
        <DataTable.Cell>{data.email}</DataTable.Cell>
        <DataTable.Cell numeric>{data.age}</DataTable.Cell>
      </DataTable.Row>
    ));
  };

  const tableHeader = () => {
    return (
      <DataTable.Header>
        <DataTable.Title>{abmData.tableHead[0]}</DataTable.Title>
        <DataTable.Title>{abmData.tableHead[1]}</DataTable.Title>
        <DataTable.Title numeric>{abmData.tableHead[2]}</DataTable.Title>
      </DataTable.Header>
    );
  };

  return (
    <ScreenLayout>
      {isLoggedIn ? (
        <View style={tw`flex-grow`}>
          <View style={tw`flex-row justify-between`}>
            <Text style={tw`text-xl font-bold p-2`}>Titulo ABM</Text>
            <TouchableOpacity style={tw`p-2`} onPress={addData}>
              <Icon name="pluscircle" type="ant-design" size={33} />
            </TouchableOpacity>
          </View>
          <View style={tw`flex-row justify-between pt-3 px-3`}>
            <DataTable>
              {tableHeader()}
              {getRows()}
              <DataTable.Pagination
                page={page}
                numberOfPages={Math.ceil(abmData.tableData.length / itemsPerPage)}
                onPageChange={page => setPage(page)}
                label={`${from + 1}-${to} of ${abmData.tableData.length}`}
                showFastPaginationControls
                numberOfItemsPerPageList={optionsPerPage}
                numberOfItemsPerPage={itemsPerPage}
                onItemsPerPageChange={setItemsPerPage}
                selectPageDropdownLabel={'Rows per page'}
              />
            </DataTable>
          </View>
        </View>
      ) : (
        <View style={tw`flex-1 `}>
          <TouchableOpacity
            onPress={() => navigation.navigate("HomeScreen")}
            style={tw`bg-black p-4 m-2 rounded shadow`}
          >
            <Text style={tw`text-white`}>login requerido</Text>
            <Icon name="arrowleft" type="ant-design" color={"white"} />
          </TouchableOpacity>
        </View>
      )}
    </ScreenLayout>
  );
}

export default AnotherScreen;

const styles = StyleSheet.create({
  container: {
    paddingTop: 100,
    paddingHorizontal: 30,
  },
});
