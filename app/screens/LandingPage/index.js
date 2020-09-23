import React from "react";
import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import GlobalStyles from "../../../GlobalStyles";
import { Ionicons } from "@expo/vector-icons";
import { OuterContainer, HeaderContainer, DateContainer } from "./style";

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
            <View style={styles.space} />
            <Text style={styles.headerText}>Tracker</Text>
            <Ionicons
              onPress={handlePress}
              name="md-search"
              style={styles.searchIcon}
              size={25}
              color="black"
            />
          </HeaderContainer>

          <DateContainer>
            <Text style={styles.dateText} onPress={handlePress}>
              all
            </Text>
            <Text style={styles.dateText} onPress={handlePress}>
              year
            </Text>
            <Text style={styles.dateText} onPress={handlePress}>
              month
            </Text>
            <Text style={styles.dateText} onPress={handlePress}>
              week
            </Text>
            <Text style={styles.dateText} onPress={handlePress}>
              day
            </Text>
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
