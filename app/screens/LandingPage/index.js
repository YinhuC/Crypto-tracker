import React from "react";
import { StyleSheet, SafeAreaView, Text, ScrollView } from "react-native";
import GlobalStyles from "../../../GlobalStyles";
import { Ionicons } from "@expo/vector-icons";
import { LineChart } from "react-native-svg-charts";
import * as shape from "d3-shape";

import {
  OuterContainer,
  HeaderContainer,
  DateContainer,
  DateText,
  HeaderText,
  CryptoComponent,
  MainContainer,
  DetailComponent,
  DetialLeft,
  DetialRight,
  Icon,
} from "./style";

class LandingPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      sylo: [],
      period: "week",
    };
  }

  componentDidMount() {
    // Fetch the data when the screen loads
    fetch("https://assets-api.sylo.io/v2/all").then((res) =>
      res.json().then((json) => {
        this.setState({ data: json });
        this.getData();
      })
    );
  }

  getData = () => {
    this.state.data.forEach((item) => {
      // Get coin data
      fetch(
        "https://assets-api.sylo.io/v2/asset/id/" +
          item.id +
          "/rate?fiat=NZD&" +
          "period=" +
          this.state.period +
          "&type=historic"
      )
        .then((res) =>
          res.json().then((json) => {
            var rate = json.history.map((data) => data.rate);
            this.setState((prevState) => ({
              graphData: {
                [item.name]: rate,
                ...prevState.graphData,
              },
            }));
          })
        )
        .catch(function (error) {
          console.log(error);
        });
    });
  };

  getJSX() {
    var code = [];

    // For every currency returned, create a component
    this.state.data.map((data) => {
      var graphData = this.state.graphData[data.name];

      // Calculate returns and data
      if (typeof graphData != "undefined") {
        var returns = graphData[graphData.length - 1] - graphData[0];
        var percentReturns = (returns / graphData[graphData.length - 1]) * 100;
        returns = returns.toFixed(5);
        percentReturns = percentReturns.toFixed(4);

        // Get every nth element to smooth out line of the graph
        let newArr = [];
        for (let x = 0; x < graphData.length; x += 10) {
          newArr.push(graphData[x]);
        }

        // Push to array
        code.push(
          <CryptoComponent>
            <DetailComponent>
              <DetialLeft>
                <Icon source={{ uri: data.icon_address }} />
                <Text style={styles.iconText}>{data.name}</Text>
              </DetialLeft>
              <DetialRight>
                <Text style={styles.moneyText}>{returns}</Text>
                <Text style={styles.returnText}>{percentReturns}</Text>
              </DetialRight>
            </DetailComponent>
            <LineChart
              curve={shape.curveNatural}
              style={{ height: 66 }}
              data={newArr}
              contentInset={{ top: 5, bottom: 5 }}
              svg={{ stroke: "#F15A29", strokeWidth: 3, strokeOpacity: 0.6 }}
            ></LineChart>
          </CryptoComponent>
        );
      }
    });

    return code;
  }

  render() {
    const handlePress = () => console.log("Text Pressed");

    // Push JSX into array and setup data
    if (
      this.state.data.length > 0 &&
      typeof this.state.graphData != "undefined" &&
      Object.keys(this.state.graphData).length !== 0
    ) {
      var code = this.getJSX();
    }

    return (
      <SafeAreaView style={GlobalStyles.adroidSafeArea}>
        <ScrollView style={styles.scrollView}>
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
          <MainContainer>{code}</MainContainer>
        </ScrollView>
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
  iconText: {
    fontSize: 15,
    color: "#495162",
    lineHeight: 17.58,
  },
  moneyText: {
    fontSize: 15,
    color: "#495162",
    lineHeight: 17.58,
    marginRight: 15,
    marginTop: 10,
  },
  returnText: {
    fontSize: 12,
    color: "#33BB5D",
    lineHeight: 18,
    marginRight: 15,
  },
});
