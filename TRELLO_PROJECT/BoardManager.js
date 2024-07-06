import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  Button,
  Text,
  ScrollView,
  TouchableOpacity,
  Modal,
} from "react-native";
import axios from "axios";
import globalStyles from "./styles/globalStyles";
const API_KEY = process.env.API_KEY;
const TOKEN = process.env.TOKEN;

export default function BoardManager({ route, navigation }) {
  const { workspaceId } = route.params;
  const [boardName, setBoardName] = useState("");
  const [boards, setBoards] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [newBoardName, setNewBoardName] = useState("");
  const [currentBoardId, setCurrentBoardId] = useState(null);

  useEffect(() => {
    fetchBoards();
  }, []);

  const fetchBoards = async () => {
    const url = `https://api.trello.com/1/organizations/${workspaceId}/boards?key=${API_KEY}&token=${TOKEN}`;
    try {
      const response = await axios.get(url);
      setBoards(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const createBoard = () => {
    const url = `https://api.trello.com/1/boards/?name=${encodeURIComponent(
      boardName
    )}&idOrganization=${workspaceId}&key=${API_KEY}&token=${TOKEN}`;
    axios
      .post(url)
      .then((response) => {
        console.log("Tableau créé :", response.data);
        setBoardName("");
        fetchBoards();
      })
      .catch((error) =>
        console.error("Erreur lors de la création du tableau :", error)
      );
  };

  const deleteBoard = async (boardId) => {
    const url = `https://api.trello.com/1/boards/${boardId}?key=${API_KEY}&token=${TOKEN}`;
    try {
      await axios.delete(url);
      fetchBoards();
    } catch (error) {
      console.error(error);
    }
  };

  const updateBoard = async () => {
    const url = `https://api.trello.com/1/boards/${currentBoardId}?name=${encodeURIComponent(
      newBoardName
    )}&key=${API_KEY}&token=${TOKEN}`;
    try {
      await axios.put(url);
      setModalVisible(false);
      fetchBoards();
    } catch (error) {
      console.error(error);
    }
  };

  const navigateToLists = (boardId) => {
    navigation.navigate("ListManager", { boardId });
  };

  return (
    <View style={globalStyles.container}>
      <TextInput
        style={globalStyles.input}
        placeholder="Nom du tableau"
        value={boardName}
        onChangeText={setBoardName}
      />
      <Button title="Créer un tableau" onPress={createBoard} />
      <ScrollView style={globalStyles.boardContainer}>
        {boards.map((board) => (
          <View key={board.id} style={globalStyles.boardItem}>
            <View style={globalStyles.boardRow}>
              <TouchableOpacity onPress={() => navigateToLists(board.id)}>
                <Text style={globalStyles.boardText}>{board.name}</Text>
              </TouchableOpacity>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Button
                  title="Modifier"
                  onPress={() => {
                    setModalVisible(true);
                    setCurrentBoardId(board.id);
                    setNewBoardName(board.name);
                  }}
                />
                <View style={{ marginLeft: 10 }}>
                  <Button
                    title="Supprimer"
                    onPress={() => deleteBoard(board.id)}
                    color="red"
                  />
                </View>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={globalStyles.centeredView}>
          <View style={globalStyles.modalView}>
            <TextInput
              style={globalStyles.modalText}
              onChangeText={setNewBoardName}
              value={newBoardName}
            />
            <Button title="Update" onPress={updateBoard} />
            <Button
              title="Cancel"
              onPress={() => setModalVisible(!modalVisible)}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
}
