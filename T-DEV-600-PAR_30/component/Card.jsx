import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

const Card = ({ title, subtitle, imageUrl, children }) => {
  return (
    <View style={styles.card}>
      {imageUrl && <Image source={{ uri: imageUrl }} style={styles.image} />}
      <View style={styles.contentContainer}>
        <Text style={styles.title}>{title}</Text>
        {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
        <View style={styles.buttonContainer}>{children}</View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#bca1ff",
    borderRadius: 8,
    shadowOpacity: 0.2,
    shadowRadius: 4,
    shadowColor: "#000",
    shadowOffset: { height: 2, width: 0 },
    elevation: 3,
    marginVertical: 10,
    overflow: "hidden",
    width: "90%",
  },
  image: {
    width: "100%",
    height: 200,
  },
  contentContainer: {
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: "#686868",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
});

export default Card;
