import React from "react";
import { StyleSheet, View, SafeAreaView } from "react-native";
import GlobalStyles from "../../../GlobalStyles";
import { Ionicons } from "@expo/vector-icons";
import { LineChart, Grid } from "react-native-svg-charts";
import * as shape from "d3-shape";

import {
  OuterContainer,
  HeaderContainer,
  DateContainer,
  DateText,
  HeaderText,
  CryptoComponent,
  MainContainer,
} from "./style";

class LandingPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      sylo: [],
    };
  }

  componentDidMount() {
    // Fetch the data when the screen loads
    fetch("https://assets-api.sylo.io/v2/all").then((res) =>
      res.json().then((json) => {
        this.setState({ data: json });
      })
    );
  }

  // extractData() {
  //   var result = this.state.data.map((data) => ({
  //     icon_address: data.icon_address,
  //     icon_address_dark: data.icon_address_dark,
  //     name: data.name,
  //     id: data.id,
  //   }));

  //   return result;
  // }

  getData() {
    var result = [];
    //var info = this.extractData();
    this.state.data.forEach(function (item) {
      // Get coin data
      fetch(
        "https://assets-api.sylo.io/v2/asset/id/" +
          item.id +
          "/rate?fiat=NZD&" +
          "period=week" +
          "&type=historic"
      )
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          var prune = data.history.map((data) => data.rate);
          console.log;
          result.push(prune);
        })
        .catch(function (error) {
          console.log(error);
        });
    });
    console.log(result);
    return result;
  }

  render() {
    if (this.state.data.length > 0) {
      this.getData();
    }

    const handlePress = () => console.log("Text Pressed");
    const data = [
      50,
      10,
      40,
      95,
      -4,
      -24,
      85,
      91,
      35,
      53,
      -53,
      24,
      50,
      -20,
      -80,
    ];

    //if (typeof this.state.sylo.history !== "undefined")
    //console.log(this.state.sylo.history[1]);

    return (
      <SafeAreaView style={GlobalStyles.adroidSafeArea}>
        <OuterContainer>
          <HeaderContainer>
            <HeaderText>Tracker</HeaderText>
            <Ionicons
              onPress={handlePress}
              name="ios-search"
              style={styles.searchIcon}
              size={25}
              color="black"
            />
          </HeaderContainer>

          <DateContainer>
            <DateText onPress={handlePress}>all</DateText>
            <DateText onPress={handlePress}>year</DateText>
            <DateText onPress={handlePress}>month</DateText>
            <DateText onPress={handlePress}>week</DateText>
            <DateText onPress={handlePress}>day</DateText>
          </DateContainer>
        </OuterContainer>
        <MainContainer>
          <CryptoComponent>
            <LineChart
              curve={shape.curveNatural}
              style={{ height: 66, top: 56 }}
              data={data}
              contentInset={{ top: 5, bottom: 5 }}
              svg={{ stroke: "#F15A29", strokeWidth: 3, strokeOpacity: 0.6 }}
            ></LineChart>
          </CryptoComponent>
        </MainContainer>
      </SafeAreaView>
    );
  }
}

export default LandingPage;

const styles = StyleSheet.create({
  searchIcon: {
    position: "absolute",
    right: "5.26%",
  },
});
