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

const API_KEY = process.env.API_KEY;
const TOKEN = process.env.TOKEN;

export default function WorkspaceManager({ navigation }) {
  const [workspaceName, setWorkspaceName] = useState("");
  const [workspaces, setWorkspaces] = useState([]);
  const [isUpdateModalVisible, setIsUpdateModalVisible] = useState(false);
  const [updatingWorkspaceId, setUpdatingWorkspaceId] = useState("");
  const [newWorkspaceName, setNewWorkspaceName] = useState("");

  useEffect(() => {
    fetchWorkspaces();
  }, []);

  const fetchWorkspaces = async () => {
    const url = `https://api.trello.com/1/members/me/organizations?key=${API_KEY}&token=${TOKEN}`;
    try {
      const response = await axios.get(url);
      setWorkspaces(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const createWorkspace = async () => {
    const url = `https://api.trello.com/1/organizations?displayName=${encodeURIComponent(
      workspaceName
    )}&name=${encodeURIComponent(workspaceName)}&key=${API_KEY}&token=${TOKEN}`;
    try {
      await axios.post(url);
      setWorkspaceName("");
      fetchWorkspaces();
    } catch (error) {
      console.error(error);
    }
  };

  const deleteWorkspace = async (workspaceId) => {
    const url = `https://api.trello.com/1/organizations/${workspaceId}?key=${API_KEY}&token=${TOKEN}`;
    try {
      await axios.delete(url);
      fetchWorkspaces();
    } catch (error) {
      console.error(error);
    }
  };

  const promptForUpdateWorkspace = (workspaceId) => {
    const workspaceToUpdate = workspaces.find(
      (workspace) => workspace.id === workspaceId
    );
    if (workspaceToUpdate) {
      setUpdatingWorkspaceId(workspaceId);
      setNewWorkspaceName(workspaceToUpdate.name);
      setIsUpdateModalVisible(true);
      fetchWorkspaces();
    }
  };

  const handleUpdateWorkspace = async () => {
    const url = `https://api.trello.com/1/organizations/${updatingWorkspaceId}?displayName=${encodeURIComponent(
      newWorkspaceName
    )}&key=${API_KEY}&token=${TOKEN}`;
    try {
      await axios.put(url);
      setIsUpdateModalVisible(false);
      setNewWorkspaceName("");
      fetchWorkspaces();
    } catch (error) {
      console.error("Erreur lors de la mise à jour du workspace :", error);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Nom du workspace"
        value={workspaceName}
        onChangeText={setWorkspaceName}
      />
      <Button title="Créer un workspace" onPress={createWorkspace} />
      <ScrollView style={styles.workspaceContainer}>
        {workspaces.map((workspace) => (
          <View style={styles.workspaceItem}>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("BoardManager", {
                  workspaceId: workspace.id,
                })
              }
            >
              <Text style={[styles.workspaceText, { marginBottom: 10 }]}>
                {workspace.name}
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
                  onPress={() => promptForUpdateWorkspace(workspace.id)}
                />
                <Button
                  title="Supprimer"
                  onPress={() => deleteWorkspace(workspace.id)}
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
              placeholder="Nouveau nom du workspace"
              value={newWorkspaceName}
              onChangeText={setNewWorkspaceName}
            />
            <Button title="Update" onPress={handleUpdateWorkspace} />
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
