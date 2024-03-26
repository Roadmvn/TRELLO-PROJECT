import React from "react";
import { View, Text, Button, ImageBackground, StyleSheet } from "react-native";

const HomeScreen = ({ navigation }) => {
  return (
    <ImageBackground
      source={{
        uri: "https://mixkit.imgix.net/art/85/85-original.png-1000h.png",
      }}
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Orga Trello</Text>
        <Button
          title="Débuter"
          onPress={() => navigation.navigate("WorkspaceManager")}
        />
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 50,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 20,
  },
});

export default HomeScreen;
