import React from "react";
import { Tab } from "react-native-elements";
import { styles } from "../../constants/styles";


const BottomBar = (props) => {
  return (
    <Tab
      value={props.pos}
      onChange={(e) => props.changeFunc(e)}
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
  );
};

export default BottomBar;
