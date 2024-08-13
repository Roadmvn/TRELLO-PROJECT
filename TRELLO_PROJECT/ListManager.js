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
import { useNavigation } from "@react-navigation/native";

const API_KEY = process.env.API_KEY;
const TOKEN = process.env.TOKEN;

export default function ListManager({ route }) {
  const { boardId } = route.params;
  const [listName, setListName] = useState("");
  const [lists, setLists] = useState([]);
  const [isUpdateModalVisible, setIsUpdateModalVisible] = useState(false);
  const [newListName, setNewListName] = useState("");
  const [currentListId, setCurrentListId] = useState("");
  const navigation = useNavigation();

  useEffect(() => {
    fetchLists();
  }, []);

  const fetchLists = async () => {
    const url = `https://api.trello.com/1/boards/${boardId}/lists?key=${API_KEY}&token=${TOKEN}`;
    try {
      const response = await axios.get(url);
      setLists(response.data);
    } catch (error) {
      console.error("Erreur lors de la récupération des listes :", error);
    }
  };

  const handleCreateList = async () => {
    const url = `https://api.trello.com/1/lists?name=${encodeURIComponent(
      listName
    )}&idBoard=${boardId}&key=${API_KEY}&token=${TOKEN}`;
    try {
      await axios.post(url);
      setListName("");
      fetchLists();
    } catch (error) {
      console.error("Erreur lors de l'ajout de la liste :", error);
    }
  };

  const handleDeleteList = async (listId) => {
    const url = `https://api.trello.com/1/lists/${listId}/closed?value=true&key=${API_KEY}&token=${TOKEN}`;
    try {
      await axios.put(url);
      fetchLists();
    } catch (error) {
      console.error("Erreur lors de la suppression de la liste :", error);
    }
  };

  const handleUpdateList = async () => {
    const url = `https://api.trello.com/1/lists/${currentListId}?name=${encodeURIComponent(
      newListName
    )}&key=${API_KEY}&token=${TOKEN}`;
    try {
      await axios.put(url);
      setNewListName("");
      setIsUpdateModalVisible(false);
      fetchLists();
    } catch (error) {
      console.error("Erreur lors de la mise à jour de la liste :", error);
    }
  };

  const promptForUpdateList = (listId, currentName) => {
    setCurrentListId(listId);
    setNewListName(currentName);
    setIsUpdateModalVisible(true);
  };

  return (
    <View style={globalStyles.container}>
      <TextInput
        style={localStyles.input}
        placeholder="Nom de la nouvelle liste"
        value={listName}
        onChangeText={setListName}
        placeholderTextColor="#ccc"
      />
      <TouchableOpacity style={localStyles.createButton} onPress={handleCreateList}>
        <Text style={localStyles.createButtonText}>Ajouter Liste</Text>
      </TouchableOpacity>
      <ScrollView style={localStyles.listContainer}>
        {lists.map((list) => (
          <View key={list.id} style={localStyles.listItem}>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("CardManager", { listId: list.id, boardId })
              }
            >
              <Text style={localStyles.listText}>{list.name}</Text>
            </TouchableOpacity>
            <View style={localStyles.actionButtonsContainer}>
              <TouchableOpacity
                style={[localStyles.actionButton, localStyles.updateButton]}
                onPress={() => promptForUpdateList(list.id, list.name)}
              >
                <Text style={localStyles.actionButtonText}>Modifier</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[localStyles.actionButton, localStyles.deleteButton]}
                onPress={() => handleDeleteList(list.id)}
              >
                <Text style={localStyles.actionButtonText}>Supprimer</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>
      <Modal
        animationType="slide"
        transparent={true}
        visible={isUpdateModalVisible}
        onRequestClose={() => setIsUpdateModalVisible(false)}
      >
        <View style={localStyles.centeredView}>
          <View style={localStyles.modalView}>
            <TextInput
              style={localStyles.modalTextInput}
              placeholder="Nouveau nom de la liste"
              value={newListName}
              onChangeText={setNewListName}
              placeholderTextColor="#ccc"
            />
            <TouchableOpacity style={localStyles.modalButton} onPress={handleUpdateList}>
              <Text style={localStyles.modalButtonText}>Mettre à jour</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[localStyles.modalButton, localStyles.cancelButton]}
              onPress={() => setIsUpdateModalVisible(false)}
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
  listContainer: {
    marginTop: 20,
  },
  listItem: {
    backgroundColor: "#444",
    padding: 20,
    marginVertical: 8,
    borderRadius: 5,
  },
  listText: {
    fontSize: 18,
    color: "#fff",
    marginBottom: 10,
  },
  actionButtonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
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
