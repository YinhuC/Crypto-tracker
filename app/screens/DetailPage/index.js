import React from "react";
import { StyleSheet, SafeAreaView, Text } from "react-native";
import GlobalStyles from "../../../GlobalStyles";
import { Entypo } from "@expo/vector-icons";
import { AreaChart } from "react-native-svg-charts";
import * as shape from "d3-shape";
import { LinearGradient, Stop, Defs } from "react-native-svg";

import {
  OuterContainer,
  HeaderContainer,
  DateContainer,
  HeaderText,
  CryptoComponent,
  MainContainer,
  DetailComponent,
  Icon,
  TitleComponent,
  DescriptionContainer,
  DescriptionLeft,
  DescriptionRight,
  Description,
} from "./style";

class LandingPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      name: "",
      period: "month",
    };
  }

  componentDidMount() {
    const { route } = this.props;
    const { data, period, graphData } = route.params;
    this.setState({
      period: period,
      data: data,
      graphData: graphData,
    });
  }

  getData = (id) => {
    // Get coin data
    fetch(
      "https://assets-api.sylo.io/v2/asset/id/" +
        id +
        "/rate?fiat=NZD&" +
        "period=" +
        this.state.period +
        "&type=historic"
    )
      .then((res) =>
        res.json().then((json) => {
          var rate = json.history.map((data) => data.rate);
          var cap = json.market_cap.toFixed(2);
          var volume = json.volume_24h.toFixed(2);
          var fiat = json.fiat_symbol;
          this.setState({
            graphData: rate,
            cap: cap,
            volume: volume,
            fiat: fiat,
          });
        })
      )
      .catch(function (error) {
        console.log(error);
      });
  };

  handleDatePress(event) {
    this.setState({
      period: event._dispatchInstances.memoizedProps.children,
    });

    // Get new data for new period
    // this.getData();
  }

  render() {
    const { navigation } = this.props;
    const { data, graphData } = this.state;
    var code = [];

    const Gradient = () => (
      <Defs key={"gradient"}>
        <LinearGradient id={"gradient"} x1={"0%"} y={"0%"} x2={"0%"} y2={"40%"}>
          <Stop offset={"0%"} stopColor={"rgb(241,90,41)"} stopOpacity={0.2} />
          <Stop offset={"100%"} stopColor={"rgb(241,90,41)"} stopOpacity={0} />
        </LinearGradient>
      </Defs>
    );

    if (
      typeof graphData != "undefined" &&
      graphData != null &&
      graphData.length != null &&
      graphData.length > 0
    ) {
      this.getData(this.state.data.id);

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
        <CryptoComponent key={data.name}>
          <DetailComponent>
            {returns < 0 ? (
              <>
                <Text style={styles.moneyText}>${graphData[0].toFixed(5)}</Text>
                <Text style={styles.returnTextN}>
                  {percentReturns}% (${returns})
                </Text>
              </>
            ) : (
              <>
                <Text style={styles.moneyText}>${graphData[0].toFixed(5)}</Text>
                <Text style={styles.returnTextP}>
                  +{percentReturns}% (${returns})
                </Text>
              </>
            )}
          </DetailComponent>
          <AreaChart
            curve={shape.curveNatural}
            style={{ height: 117 }}
            data={newArr}
            contentInset={{ top: 5, bottom: 5 }}
            svg={{
              strokeWidth: 2,
              fill: "url(#gradient)",
              stroke: "#F15A29",
              strokeOpacity: 0.5,
            }}
          >
            <Gradient />
          </AreaChart>
        </CryptoComponent>
      );
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
        <OuterContainer>
          <HeaderContainer>
            <Entypo
              onPress={() => navigation.goBack()}
              name="chevron-thin-left"
              size={24}
              color="black"
              style={styles.backIcon}
            />
            <TitleComponent>
              <Icon source={{ uri: data.icon_address }} />
              <HeaderText>{data.name}</HeaderText>
            </TitleComponent>
          </HeaderContainer>

          <DateContainer>{dateJSX}</DateContainer>
        </OuterContainer>

        <MainContainer>{code}</MainContainer>

        <DescriptionContainer>
          <Text style={styles.descriptionTitle}>Information</Text>
        </DescriptionContainer>
        <Description>
          <DescriptionLeft>
            <Text style={styles.description}>Symbol:</Text>
            <Text style={styles.description}>Market Cap:</Text>
            <Text style={styles.description}>24h Volume:</Text>
          </DescriptionLeft>
          <DescriptionRight>
            <Text style={styles.description}>{data.symbol} </Text>
            <Text style={styles.description}>
              ${this.state.cap} {this.state.fiat}
            </Text>
            <Text style={styles.description}>
              ${this.state.volume} {this.state.fiat}
            </Text>
          </DescriptionRight>
        </Description>
      </SafeAreaView>
    );
  }
}

export default LandingPage;

const styles = StyleSheet.create({
  backIcon: {
    position: "absolute",
    left: 17.77,
  },
  iconText: {
    fontSize: 15,
    color: "#495162",
    lineHeight: 17.58,
  },
  moneyText: {
    fontSize: 18,
    color: "#495162",
    lineHeight: 17.58,
    marginRight: 15,
    marginTop: 12,
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
  descriptionTitle: {
    color: "#495162",
    lineHeight: 21,
    marginBottom: 12,
    fontSize: 15,
  },
  description: {
    color: "#8A96AA",
    lineHeight: 21,
    fontSize: 15,
    marginBottom: 12,
    marginLeft: 34,
  },
});
