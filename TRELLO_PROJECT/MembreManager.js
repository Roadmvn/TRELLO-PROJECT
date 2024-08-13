import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from "react-native";
import axios from "axios";
import globalStyles from "./styles/globalStyles";

const API_KEY = process.env.API_KEY;
const TOKEN = process.env.TOKEN;

export default function MemberManager({ route }) {
  const { cardId, boardId } = route.params;
  const [members, setMembers] = useState([]);
  const [assignedMembers, setAssignedMembers] = useState([]);

  useEffect(() => {
    fetchAllMembers(boardId);
    fetchAssignedMembers(cardId);
  }, [cardId, boardId]);

  const fetchAllMembers = async () => {
    const url = `https://api.trello.com/1/boards/${boardId}/members?key=${API_KEY}&token=${TOKEN}`;
    try {
      const response = await axios.get(url);
      setMembers(response.data);
    } catch (error) {
      console.error("Erreur lors de la récupération des membres :", error);
    }
  };

  const fetchAssignedMembers = async (cardId) => {
    const url = `https://api.trello.com/1/cards/${cardId}/members?key=${API_KEY}&token=${TOKEN}`;
    try {
      const response = await axios.get(url);
      setAssignedMembers(response.data.map((member) => member.id));
    } catch (error) {
      console.error("Erreur lors de la récupération des membres assignés :", error);
    }
  };

  const assignMemberToCard = async (memberId) => {
    const url = `https://api.trello.com/1/cards/${cardId}/idMembers?key=${API_KEY}&token=${TOKEN}&value=${memberId}`;
    try {
      await axios.post(url);
      fetchAssignedMembers(cardId);
    } catch (error) {
      console.error("Erreur lors de l'assignation du membre :", error);
    }
  };

  const removeMemberFromCard = async (memberId) => {
    const url = `https://api.trello.com/1/cards/${cardId}/idMembers/${memberId}?key=${API_KEY}&token=${TOKEN}`;
    try {
      await axios.delete(url);
      fetchAssignedMembers(cardId);
    } catch (error) {
      console.error("Erreur lors du retrait du membre :", error);
    }
  };

  return (
    <View style={globalStyles.container}>
      <ScrollView>
        {members.map((member) => (
          <View key={member.id} style={localStyles.memberItem}>
            <Text style={localStyles.memberText}>{member.fullName}</Text>
            <TouchableOpacity
              style={[
                localStyles.actionButton,
                assignedMembers.includes(member.id)
                  ? localStyles.unassignButton
                  : localStyles.assignButton,
              ]}
              onPress={() =>
                assignedMembers.includes(member.id)
                  ? removeMemberFromCard(member.id)
                  : assignMemberToCard(member.id)
              }
            >
              <Text style={localStyles.actionButtonText}>
                {assignedMembers.includes(member.id) ? "Désassigner" : "Assigner"}
              </Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const localStyles = StyleSheet.create({
  memberItem: {
    backgroundColor: "#444",
    padding: 15,
    marginVertical: 8,
    borderRadius: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  memberText: {
    color: "#fff",
    fontSize: 18,
  },
  actionButton: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  assignButton: {
    backgroundColor: "#007bff",
  },
  unassignButton: {
    backgroundColor: "#dc3545",
  },
  actionButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
