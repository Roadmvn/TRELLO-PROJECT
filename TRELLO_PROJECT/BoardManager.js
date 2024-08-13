import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  Text,
  ScrollView,
  TouchableOpacity,
  Modal,
  StyleSheet,
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
        style={localStyles.input}
        placeholder="Nom du tableau"
        value={boardName}
        onChangeText={setBoardName}
        placeholderTextColor="#ccc"
      />
      <TouchableOpacity style={localStyles.createButton} onPress={createBoard}>
        <Text style={localStyles.createButtonText}>Créer un tableau</Text>
      </TouchableOpacity>
      <ScrollView style={localStyles.boardContainer}>
        {boards.map((board) => (
          <View key={board.id} style={localStyles.boardItem}>
            <View style={localStyles.boardRow}>
              <TouchableOpacity onPress={() => navigateToLists(board.id)}>
                <Text style={localStyles.boardText}>{board.name}</Text>
              </TouchableOpacity>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <TouchableOpacity
                  style={[localStyles.actionButton, localStyles.updateButton]}
                  onPress={() => {
                    setModalVisible(true);
                    setCurrentBoardId(board.id);
                    setNewBoardName(board.name);
                  }}
                >
                  <Text style={localStyles.actionButtonText}>Modifier</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[localStyles.actionButton, localStyles.deleteButton]}
                  onPress={() => deleteBoard(board.id)}
                >
                  <Text style={localStyles.actionButtonText}>Supprimer</Text>
                </TouchableOpacity>
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
        <View style={localStyles.centeredView}>
          <View style={localStyles.modalView}>
            <TextInput
              style={localStyles.modalTextInput}
              onChangeText={setNewBoardName}
              value={newBoardName}
              placeholderTextColor="#ccc"
            />
            <TouchableOpacity style={localStyles.modalButton} onPress={updateBoard}>
              <Text style={localStyles.modalButtonText}>Mettre à jour</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[localStyles.modalButton, localStyles.cancelButton]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={localStyles.modalButtonText}>Annuler</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const localStyles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: "#444",
    borderRadius: 5,
    padding: 10,
    color: "#fff",
    backgroundColor: "#333",
    marginVertical: 10,
  },
  createButton: {
    backgroundColor: "#007bff",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    marginVertical: 10,
  },
  createButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  boardContainer: {
    marginTop: 20,
  },
  boardItem: {
    backgroundColor: "#444",
    padding: 20,
    marginVertical: 8,
    borderRadius: 5,
  },
  boardRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  boardText: {
    fontSize: 18,
    color: "#fff",
  },
  actionButton: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    marginLeft: 10,
  },
  updateButton: {
    backgroundColor: "#28a745",
  },
  deleteButton: {
    backgroundColor: "#dc3545",
  },
  actionButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalView: {
    width: 300,
    backgroundColor: "#444",
    borderRadius: 5,
    padding: 20,
    alignItems: "center",
  },
  modalTextInput: {
    width: "100%",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    marginBottom: 15,
    padding: 10,
    fontSize: 16,
    color: "#fff",
  },
  modalButton: {
    backgroundColor: "#007bff",
    padding: 10,
    borderRadius: 5,
    marginVertical: 5,
    width: "100%",
    alignItems: "center",
  },
  cancelButton: {
    backgroundColor: "#6c757d",
  },
  modalButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
