import React from "react";
import { StyleSheet, View, SafeAreaView } from "react-native";
import GlobalStyles from "../../../GlobalStyles";
import { Ionicons } from "@expo/vector-icons";

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
      json: [],
    };
  }

  componentDidMount() {
    // Fetch the data when the screen loads
    fetch(
      "https://public.opendatasoft.com/api/records/1.0/search/?dataset=titanic-passengers&q=&rows=1000"
    ).then((res) =>
      res.json().then((json) => {
        this.setState({ data: json });
      })
    );
  }

  render() {
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
          <CryptoComponent></CryptoComponent>
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
