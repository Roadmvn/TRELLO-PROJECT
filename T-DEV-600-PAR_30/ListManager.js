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
import styles from "./styles/globalStyles";
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
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Nom de la nouvelle liste"
        value={listName}
        onChangeText={setListName}
      />
      <Button title="Ajouter Liste" onPress={handleCreateList} />
      <ScrollView style={styles.workspaceContainer}>
        {lists.map((list) => (
          <View key={list.id} style={styles.workspaceItem}>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("CardManager", { listId: list.id, boardId })
              }
            >
              <Text style={[styles.workspaceText, { marginBottom: 10 }]}>
                {list.name}
              </Text>
            </TouchableOpacity>
            <View style={styles.buttonContainer}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Button
                  title="Modifier"
                  onPress={() => promptForUpdateList(list.id, list.name)}
                />
                <Button
                  title="Supprimer"
                  onPress={() => handleDeleteList(list.id)}
                  color="red"
                />
              </View>
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
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <TextInput
              style={styles.modalText}
              placeholder="Nouveau nom de la liste"
              value={newListName}
              onChangeText={setNewListName}
            />
            <Button title="Update" onPress={handleUpdateList} />
            <Button
              title="Cancel"
              onPress={() => setIsUpdateModalVisible(false)}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
}
