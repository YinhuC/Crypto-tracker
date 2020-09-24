import React from "react";
import LandingPage from "./app/screens/LandingPage";
import DetailPage from "./app/screens/DetailPage";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

const screens = {
  LandingPage: {
    screen: LandingPage,
  },
  DetailPage: {
    screen: DetailPage,
  },
};

const Stack = createStackNavigator();

export default function App() {
  return (
    <>
      <StatusBar style="auto" />
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
          initialRouteName="LandingPage"
        >
          <Stack.Screen name="LandingPage" component={LandingPage} />
          <Stack.Screen name="DetailPage" component={DetailPage} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
