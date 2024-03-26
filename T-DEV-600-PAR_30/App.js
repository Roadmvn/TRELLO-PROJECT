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
          options={{ title: "Accueil" }}
        />
        <Stack.Screen
          name="WorkspaceManager"
          component={WorkspaceManager}
          options={{ title: "Workspace" }}
        />
        <Stack.Screen
          name="BoardManager"
          component={BoardManager}
          options={{ title: "Tableaux" }}
        />
        <Stack.Screen
          name="ListManager"
          component={ListManager}
          options={{ title: "Listes" }}
        />
        <Stack.Screen
          name="CardManager"
          component={CardManager}
          options={{ title: "Cartes" }}
        />
        <Stack.Screen
          name="MembreManager"
          component={MembreManager}
          options={{ title: "Membres" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
