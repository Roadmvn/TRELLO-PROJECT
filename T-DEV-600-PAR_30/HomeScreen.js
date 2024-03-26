import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
} from "react-native";

const HomeScreen = ({ navigation }) => {
  return (
    <ImageBackground
      source={{
        uri: "https://media.istockphoto.com/id/1266718523/fr/vectoriel/ampoule-avec-rayons-briller-symbole-d%C3%A9nergie-et-did%C3%A9e-isol%C3%A9-sur-le-fond-blanc.jpg?s=612x612&w=0&k=20&c=WuahES3MJJvJTajhClvzLQsobtVzF0vV1ytG4RTHY10=",
      }}
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("WorkspaceManager")}
        >
          <Text style={styles.buttonText}>Commencer</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Trello Pro Max</Text>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "flex-end",
  },
  container: {
    flex: 0.3,
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    paddingBottom: 20,
  },
  title: {
    fontSize: 50,
    fontWeight: "bold",
    color: "red",
  },
  button: {
    backgroundColor: "#000",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default HomeScreen;
