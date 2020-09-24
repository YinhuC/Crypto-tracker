import React from "react";
import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import GlobalStyles from "../../../GlobalStyles";
import { Ionicons } from "@expo/vector-icons";
import {
  OuterContainer,
  HeaderContainer,
  DateContainer,
  DateText,
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

    return (
      <SafeAreaView style={GlobalStyles.adroidSafeArea}>
        <OuterContainer>
          <HeaderContainer>
            <Text>Tracker</Text>
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

        <View style={styles.mainContainer}></View>
      </SafeAreaView>
    );
  }
}

export default LandingPage;

const styles = StyleSheet.create({
  mainContainer: {},
});
