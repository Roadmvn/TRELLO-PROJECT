import React, { useState, useEffect } from "react";
import { View, Button, Text, ScrollView, TouchableOpacity } from "react-native";
import axios from "axios";
import styles from "./styles/globalStyles";

const API_KEY = process.env.API_KEY;
const TOKEN = process.env.TOKEN;

export default function MemberManager({ route }) {
  const { cardId } = route.params;
  const { boardId } = route.params;
  const [members, setMembers] = useState([]);
  const [assignedMembers, setAssignedMembers] = useState([]);

  useEffect(() => {
    fetchAllMembers(boardId);
    fetchAssignedMembers(cardId);
  }, [cardId, boardId]);

  const fetchAllMembers = async () => {
    const url = `https://api.trello.com/1/boards/${boardId}/members?key=${API_KEY}&token=${TOKEN}`;
    try {
      console.log(boardId);
      const response = await axios.get(url);
      setMembers(response.data);
    } catch (error) {
      console.log(boardId);
      console.error("Erreur lors de la récupération des membres :", error);
    }
  };

  const fetchAssignedMembers = async (cardId) => {
    const url = `https://api.trello.com/1/cards/${cardId}/members?key=${API_KEY}&token=${TOKEN}`;
    try {
      const response = await axios.get(url);
      setAssignedMembers(response.data.map((member) => member.id));
    } catch (error) {
      console.error(
        "Erreur lors de la récupération des membres assignés :",
        error
      );
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
    <View style={styles.container}>
      <ScrollView>
        {members.map((member) => (
          <View key={member.id} style={styles.memberItem}>
            <Text style={styles.memberText}>{member.fullName}</Text>
            {assignedMembers.includes(member.id) ? (
              <Button
                title="Désassigner"
                onPress={() => removeMemberFromCard(member.id)}
              />
            ) : (
              <Button
                title="Assigner"
                onPress={() => assignMemberToCard(member.id)}
              />
            )}
          </View>
        ))}
      </ScrollView>
    </View>
  );
}
