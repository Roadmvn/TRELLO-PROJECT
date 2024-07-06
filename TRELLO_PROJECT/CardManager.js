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

export default function CardManager({ route }) {
  const { listId, boardId } = route.params;
  const [cardName, setCardName] = useState("");
  const [cardDesc, setCardDesc] = useState("");
  const [cards, setCards] = useState([]);
  const [isUpdateModalVisible, setIsUpdateModalVisible] = useState(false);
  const [updatingCardId, setUpdatingCardId] = useState("");
  const [newCardName, setNewCardName] = useState("");
  const [newCardDesc, setNewCardDesc] = useState("");
  const navigation = useNavigation();

  useEffect(() => {
    fetchCards();
  }, []);

  const fetchCards = async () => {
    const url = `https://api.trello.com/1/lists/${listId}/cards?key=${API_KEY}&token=${TOKEN}`;
    try {
      const response = await axios.get(url);
      setCards(response.data);
    } catch (error) {
      console.error("Erreur lors de la récupération des cartes :", error);
    }
  };

  const handleCreateCard = async () => {
    const url = `https://api.trello.com/1/cards?idList=${listId}&name=${encodeURIComponent(
      cardName
    )}&desc=${encodeURIComponent(cardDesc)}&key=${API_KEY}&token=${TOKEN}`;
    try {
      await axios.post(url);
      setCardName("");
      setCardDesc("");
      fetchCards();
    } catch (error) {
      console.error("Erreur lors de l'ajout de la carte :", error);
    }
  };

  const handleDeleteCard = async (cardId) => {
    const url = `https://api.trello.com/1/cards/${cardId}?key=${API_KEY}&token=${TOKEN}`;
    try {
      await axios.delete(url);
      fetchCards();
    } catch (error) {
      console.error("Erreur lors de la suppression de la carte :", error);
    }
  };

  const promptForUpdateCard = (cardId, currentName, currentDesc) => {
    setUpdatingCardId(cardId);
    setNewCardName(currentName);
    setNewCardDesc(currentDesc);
    setIsUpdateModalVisible(true);
  };

  const handleUpdateCard = async () => {
    const url = `https://api.trello.com/1/cards/${updatingCardId}?name=${encodeURIComponent(
      newCardName
    )}&desc=${encodeURIComponent(newCardDesc)}&key=${API_KEY}&token=${TOKEN}`;
    try {
      await axios.put(url);
      setNewCardName("");
      setNewCardDesc("");
      setIsUpdateModalVisible(false);
      fetchCards();
    } catch (error) {
      console.error("Erreur lors de la mise à jour de la carte :", error);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Nom de la carte"
        value={cardName}
        onChangeText={setCardName}
      />
      <TextInput
        style={styles.input}
        placeholder="Description de la carte"
        value={cardDesc}
        onChangeText={setCardDesc}
      />
      <Button title="Ajouter Carte" onPress={handleCreateCard} />
      <ScrollView style={styles.workspaceContainer}>
        {cards.map((card) => (
          <View key={card.id} style={styles.workspaceItem}>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("MembreManager", {
                  cardId: card.id,
                  boardId,
                })
              }
            >
              <Text style={[styles.workspaceText, { marginBottom: 10 }]}>
                {card.name} - {card.desc}
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
                  onPress={() =>
                    promptForUpdateCard(card.id, card.name, card.desc)
                  }
                />
                <Button
                  title="Supprimer"
                  onPress={() => handleDeleteCard(card.id)}
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
              placeholder="Nouveau nom de la carte"
              value={newCardName}
              onChangeText={setNewCardName}
            />
            <TextInput
              style={styles.modalText}
              placeholder="Nouvelle description de la carte"
              value={newCardDesc}
              onChangeText={setNewCardDesc}
            />
            <Button title="Update" onPress={handleUpdateCard} />
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
