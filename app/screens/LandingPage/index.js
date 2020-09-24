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
      period: "month",
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
    const { navigation } = this.props;

    var code = [];

    // For every currency returned, create a component
    this.state.data.map((data) => {
      var name = data.name;
      var graphData = this.state.graphData[name];

      // Calculate returns and data
      if (
        typeof graphData != "undefined" &&
        graphData != null &&
        graphData.length != null &&
        graphData.length > 0
      ) {
        var returns = graphData[graphData.length - 1] - graphData[0];
        var percentReturns = (returns / graphData[graphData.length - 1]) * 100;
        returns = returns.toFixed(4);
        percentReturns = percentReturns.toFixed(2);

        // Get every nth element to smooth out line of the graph
        let newArr = [];
        for (let x = 0; x < graphData.length; x += 10) {
          newArr.push(graphData[x]);
        }

        // Push to array
        code.push(
          <CryptoComponent
            key={name}
            onPress={() =>
              navigation.navigate("DetailPage", {
                period: this.state.period,
                data: data,
                graphData: graphData,
              })
            }
          >
            <DetailComponent>
              <DetialLeft>
                <Icon source={{ uri: data.icon_address }} />
                <Text style={styles.iconText}>{name}</Text>
              </DetialLeft>
              <DetialRight>
                {returns < 0 ? (
                  <>
                    <Text style={styles.moneyText}>
                      ${graphData[0].toFixed(5)}
                    </Text>
                    <Text style={styles.returnTextN}>
                      {percentReturns}% (${returns})
                    </Text>
                  </>
                ) : (
                  <>
                    <Text style={styles.moneyText}>
                      ${graphData[0].toFixed(5)}
                    </Text>
                    <Text style={styles.returnTextP}>
                      +{percentReturns}% (${returns})
                    </Text>
                  </>
                )}
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
  handleDatePress(event) {
    this.setState({
      period: event._dispatchInstances.memoizedProps.children,
    });

    // Get new data for new period
    // this.getData();
  }

  render() {
    // Push JSX into array and setup data
    if (
      this.state.data.length > 0 &&
      typeof this.state.graphData != "undefined" &&
      Object.keys(this.state.graphData).length !== 0
    ) {
      // This takes too long to update all the graphs, blocks the user
      // this.getData();

      var cryptoJSX = this.getJSX();
    }

    // Setup date component
    const dates = ["all", "year", "month", "week", "day"];
    var dateJSX = [];
    dates.map((date) => {
      dateJSX.push(
        <Text
          key={date}
          style={
            this.state.period === date
              ? styles.dateTextPressed
              : styles.dateText
          }
          onPress={(event) => this.handleDatePress(event)}
        >
          {date}
        </Text>
      );
    });

    return (
      <SafeAreaView style={GlobalStyles.adroidSafeArea}>
        <ScrollView style={styles.scrollView}>
          <OuterContainer>
            <HeaderContainer>
              <HeaderText>Tracker</HeaderText>
              <Ionicons
                name="ios-search"
                style={styles.searchIcon}
                size={25}
                color="black"
              />
            </HeaderContainer>

            <DateContainer>{dateJSX}</DateContainer>
          </OuterContainer>

          <MainContainer>{cryptoJSX}</MainContainer>
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
  returnTextP: {
    fontSize: 12,
    color: "#33BB5D",
    lineHeight: 18,
    marginRight: 15,
  },
  returnTextN: {
    fontSize: 12,
    color: "red",
    lineHeight: 18,
    marginRight: 15,
  },
  dateText: {
    color: "#8a96aa",
    lineHeight: 21,
    fontSize: 15,
  },
  dateTextPressed: {
    color: "#F15A29",
    lineHeight: 21,
    fontSize: 15,
  },
});
