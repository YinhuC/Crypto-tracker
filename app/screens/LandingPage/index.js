import React from "react";
import {
  StyleSheet,
  SafeAreaView,
  Text,
  ScrollView,
  Switch,
  Modal,
  StatusBar,
} from "react-native";
import GlobalStyles from "../../../GlobalStyles";
import { Ionicons } from "@expo/vector-icons";
import { LineChart } from "react-native-svg-charts";
import * as shape from "d3-shape";
import { Entypo } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";

import {
  OuterContainer,
  HeaderContainer,
  DateContainer,
  CryptoComponent,
  MainContainer,
  DetailComponent,
  DetialLeft,
  DetialRight,
  Icon,
  ModalContainer,
  SearchContainer,
  Input,
  ResultContainer,
  Result,
} from "./style";

class LandingPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      names: [],
      darkMode: false,
      backgroundColor: "white",
      iconColor: "black",
      borderColor: "#f6f6f6",
      period: "month",
      modal: false,
      text: "",
    };
  }

  componentDidMount() {
    // Fetch the data when the screen loads
    fetch("https://assets-api.sylo.io/v2/all").then((res) =>
      res.json().then((json) => {
        var names = json.map((data) => data.name);
        this.setState({ data: json, names: names });
        this.getData();
      })
    );
  }

  toggleSwitch() {
    this.setState({
      darkMode: !this.state.darkMode,
      backgroundColor: this.state.darkMode ? "white" : "black",
      iconColor: this.state.darkMode ? "black" : "white",
      borderColor: this.state.darkMode ? "#f6f6f6" : "#161616",
      searchColor: this.state.darkMode ? "#161616" : "#f6f6f6",
    });
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
                iconColor: this.state.iconColor,
                backgroundColor: this.state.backgroundColor,
                borderColor: this.state.borderColor,
                darkMode: this.state.darkMode,
              })
            }
            style={{
              backgroundColor: this.state.backgroundColor,
              borderColor: this.state.borderColor,
            }}
          >
            <DetailComponent>
              <DetialLeft>
                <Icon
                  source={
                    this.state.darkMode
                      ? { uri: data.icon_address_dark }
                      : { uri: data.icon_address }
                  }
                />
                <Text
                  style={
                    !this.state.darkMode ? styles.iconText : darkStyles.iconText
                  }
                >
                  {name}
                </Text>
              </DetialLeft>
              <DetialRight>
                {returns < 0 ? (
                  <>
                    <Text
                      style={
                        !this.state.darkMode
                          ? styles.moneyText
                          : darkStyles.moneyText
                      }
                    >
                      ${graphData[0].toFixed(5)}
                    </Text>
                    <Text style={styles.returnTextN}>
                      {percentReturns}% (${returns})
                    </Text>
                  </>
                ) : (
                  <>
                    <Text
                      style={
                        !this.state.darkMode
                          ? styles.moneyText
                          : darkStyles.moneyText
                      }
                    >
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
              style={{
                height: 66,
                backgroundColor: this.state.backgroundColor,
              }}
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

  handleModal() {
    this.setState({
      modal: !this.state.modal,
    });
  }

  handleDatePress(event) {
    this.setState({
      period: event._dispatchInstances.memoizedProps.children,
    });

    // Get new data for new period
    // this.getData();
  }

  handleText(text) {
    const { navigation } = this.props;

    var arr = this.state.names.filter(
      (name) => text === name.substring(0, text.length)
    );
    if (
      this.state.data.length > 0 &&
      typeof this.state.graphData != "undefined" &&
      Object.keys(this.state.graphData).length !== 0
    ) {
      var searchJSX = [];
      arr.map((name, index) => {
        var data = this.state.data.filter((data) => data.name === name);
        searchJSX.push(
          <Result
            key={index}
            onPress={() => {
              navigation.navigate("DetailPage", {
                period: this.state.period,
                data: data[0],
                graphData: this.state.graphData[name],
                iconColor: this.state.iconColor,
                backgroundColor: this.state.backgroundColor,
                borderColor: this.state.borderColor,
                darkMode: this.state.darkMode,
              });
              this.handleModal();
            }}
          >
            <AntDesign
              name="arrowright"
              size={24}
              color={this.state.iconColor}
              style={{ marginRight: 20 }}
            />
            <Text
              style={
                !this.state.darkMode ? styles.iconText : darkStyles.iconText
              }
            >
              {name}
            </Text>
          </Result>
        );
      });
    }

    this.setState({
      text: text,
      searchJSX: searchJSX,
    });
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
        <ScrollView style={{ backgroundColor: this.state.backgroundColor }}>
          <StatusBar
            barStyle={!this.state.darkMode ? "dark-content" : "light-content"}
            backgroundColor={this.state.backgroundColor}
          />
          <Modal
            animationType="fade"
            visible={this.state.modal}
            onRequestClose={() => this.handleModal()}
            transparent
          >
            <ModalContainer
              style={{ backgroundColor: this.state.backgroundColor }}
            >
              <SearchContainer
                style={{ borderBottomColor: this.state.searchColor }}
              >
                <Entypo
                  onPress={() => this.handleModal()}
                  name="chevron-thin-left"
                  size={24}
                  color={this.state.iconColor}
                  style={{ marginBottom: 10 }}
                />
                <Input
                  onChangeText={(text) => this.handleText(text)}
                  style={{ borderColor: this.state.searchColor }}
                  value={this.state.text}
                  returnKeyType="search"
                  autoFocus={this.state.modal}
                />
              </SearchContainer>
              <ResultContainer>{this.state.searchJSX}</ResultContainer>
            </ModalContainer>
          </Modal>

          <OuterContainer
            style={{ backgroundColor: this.state.backgroundColor }}
          >
            <HeaderContainer
              style={{ backgroundColor: this.state.backgroundColor }}
            >
              <Switch
                trackColor={{ false: "#767577", true: "#F15A29" }}
                thumbColor={"#f4f3f4"}
                ios_backgroundColor="#3e3e3e"
                onValueChange={() => this.toggleSwitch()}
                value={this.state.darkMode}
                style={styles.toggle}
              />
              <Text
                style={
                  !this.state.darkMode
                    ? styles.headerText
                    : darkStyles.headerText
                }
              >
                Tracker
              </Text>
              <Ionicons
                name="ios-search"
                style={{
                  position: "absolute",
                  right: "5.26%",
                  color: this.state.iconColor,
                }}
                size={25}
                color="black"
                onPress={() => {
                  this.handleModal();
                }}
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
  headerText: {
    fontSize: 18,
    color: "#495162",
    lineHeight: 21.09,
  },
  toggle: {
    position: "absolute",
    left: "5.26%",
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

const darkStyles = StyleSheet.create({
  headerText: {
    fontSize: 18,
    color: "#F6F6F6",
    lineHeight: 21.09,
  },
  iconText: {
    fontSize: 15,
    color: "#F6F6F6",
    lineHeight: 17.58,
  },
  moneyText: {
    fontSize: 15,
    color: "#F6F6F6",
    lineHeight: 17.58,
    marginRight: 15,
    marginTop: 10,
  },
});
