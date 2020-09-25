import React from "react";
import LandingPage from "./app/screens/LandingPage";
import DetailPage from "./app/screens/DetailPage";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

export default function App() {
  return (
    <>
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
