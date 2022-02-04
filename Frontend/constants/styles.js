import { Dimensions, StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  screen: {
    marginTop: Dimensions.get("window").height / 20,
  },
  boldText: {
    fontWeight: "bold",
  },
  container: {
    flex: 1,
    padding: 16,
  },
  // drawer == navigation container
  navigationContainer: {
    marginTop: 25,
    backgroundColor: "#ecf0f1",
    flexDirection: "column",
  },
  // opcion del menu de navegacion
  navOptionView: {
    padding: 10,
    marginVertical: 4,
    marginHorizontal: 8,
    borderBottomColor: "black",
    borderBottomWidth: 0.5,
  },
  AntaresLogo: {
    marginLeft: 28,
    width: 110,
    height: 60,
  },
  paragraph: {
    padding: 16,
    fontSize: 15,
    textAlign: "center",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
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
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  tabViewItems: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    backgroundColor: "rgb(1,114,191)",
  },
  tabItemTitle: {
    fontSize: 12,
    color: "black",
  },
});
