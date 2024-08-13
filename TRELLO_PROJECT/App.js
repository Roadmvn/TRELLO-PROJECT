import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import WorkspaceManager from "./WorkspaceManager";
import BoardManager from "./BoardManager";
import ListManager from "./ListManager";
import HomeScreen from "./HomeScreen";
import CardManager from "./CardManager";
import MembreManager from "./MembreManager";

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Orga Trello"
          component={HomeScreen}
          options={{
            title: "Accueil",
            headerStyle: {
              backgroundColor: "#333",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />
        <Stack.Screen
          name="WorkspaceManager"
          component={WorkspaceManager}
          options={{
            title: "Workspace",
            headerStyle: {
              backgroundColor: "#333",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />
        <Stack.Screen
          name="BoardManager"
          component={BoardManager}
          options={{
            title: "Tableaux",
            headerStyle: {
              backgroundColor: "#333",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />
        <Stack.Screen
          name="ListManager"
          component={ListManager}
          options={{
            title: "Listes",
            headerStyle: {
              backgroundColor: "#333",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />
        <Stack.Screen
          name="CardManager"
          component={CardManager}
          options={{
            title: "Cartes",
            headerStyle: {
              backgroundColor: "#333",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />
        <Stack.Screen
          name="MembreManager"
          component={MembreManager}
          options={{
            title: "Membres",
            headerStyle: {
              backgroundColor: "#333",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
