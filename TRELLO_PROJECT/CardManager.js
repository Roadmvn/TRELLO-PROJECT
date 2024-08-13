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
    <View style={globalStyles.container}>
      <TextInput
        style={localStyles.input}
        placeholder="Nom de la carte"
        value={cardName}
        onChangeText={setCardName}
        placeholderTextColor="#ccc"
      />
      <TextInput
        style={localStyles.input}
        placeholder="Description de la carte"
        value={cardDesc}
        onChangeText={setCardDesc}
        placeholderTextColor="#ccc"
      />
      <TouchableOpacity style={localStyles.createButton} onPress={handleCreateCard}>
        <Text style={localStyles.createButtonText}>Ajouter Carte</Text>
      </TouchableOpacity>
      <ScrollView style={localStyles.cardContainer}>
        {cards.map((card) => (
          <View key={card.id} style={localStyles.cardItem}>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("MembreManager", {
                  cardId: card.id,
                  boardId,
                })
              }
            >
              <Text style={localStyles.cardText}>{card.name} - {card.desc}</Text>
            </TouchableOpacity>
            <View style={localStyles.actionButtonsContainer}>
              <TouchableOpacity
                style={[localStyles.actionButton, localStyles.updateButton]}
                onPress={() =>
                  promptForUpdateCard(card.id, card.name, card.desc)
                }
              >
                <Text style={localStyles.actionButtonText}>Modifier</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[localStyles.actionButton, localStyles.deleteButton]}
                onPress={() => handleDeleteCard(card.id)}
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
              placeholder="Nouveau nom de la carte"
              value={newCardName}
              onChangeText={setNewCardName}
              placeholderTextColor="#ccc"
            />
            <TextInput
              style={localStyles.modalTextInput}
              placeholder="Nouvelle description de la carte"
              value={newCardDesc}
              onChangeText={setNewCardDesc}
              placeholderTextColor="#ccc"
            />
            <TouchableOpacity style={localStyles.modalButton} onPress={handleUpdateCard}>
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
  cardContainer: {
    marginTop: 20,
  },
  cardItem: {
    backgroundColor: "#444",
    padding: 20,
    marginVertical: 8,
    borderRadius: 5,
  },
  cardText: {
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
