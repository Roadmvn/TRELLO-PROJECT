import React, { useState, useEffect } from "react";
import { View, Text, Button } from "react-native";
import { TrelloAPI } from "../api/TrelloAPI";

const HomeScreen = ({ navigation }) => {
  const [boards, setBoards] = useState([]);

  useEffect(() => {
    TrelloAPI.fetchBoards().then((data) => setBoards(data));
  }, []);

  return (
    <View>
      {boards.map((board) => (
        <Button
          key={board.id}
          title={board.name}
          onPress={() => navigation.navigate("Board", { boardId: board.id })}
        />
      ))}
    </View>
  );
};

export default HomeScreen;
