import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from "../screens/HomeScreen";
import BoardScreen from "../screens/BoardScreen";

const Stack = createStackNavigator();

const AppNavigation = () => (
  <NavigationContainer>
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ title: "Home" }}
      />
      <Stack.Screen
        name="Board"
        component={BoardScreen}
        options={{ title: "Board Details" }}
      />
    </Stack.Navigator>
  </NavigationContainer>
);

export default AppNavigation;
