import React from "react";
import { View, Text } from "react-native";

const BoardScreen = ({ route }) => {
  const { boardId } = route.params;

  return (
    <View>
      <Text>Board ID: {boardId}</Text>
      {/* Afficher plus de détails sur le tableau ici */}
    </View>
  );
};

export default BoardScreen;
