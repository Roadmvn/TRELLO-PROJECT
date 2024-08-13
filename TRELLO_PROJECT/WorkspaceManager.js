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
      await fetchWorkspaces(); // Recharger les workspaces après la création
    } catch (error) {
      console.error(error);
    }
  };

  const deleteWorkspace = async (workspaceId) => {
    const url = `https://api.trello.com/1/organizations/${workspaceId}?key=${API_KEY}&token=${TOKEN}`;
    try {
      await axios.delete(url);
      await fetchWorkspaces(); // Recharger les workspaces après la suppression
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
    }
  };

  const handleUpdateWorkspace = async () => {
    const url = `https://api.trello.com/1/organizations/${updatingWorkspaceId}?displayName=${encodeURIComponent(
      newWorkspaceName
    )}&key=${API_KEY}&token=${TOKEN}`;
    try {
      const response = await axios.put(url); // Attendre la réponse de l'API
      console.log(response.data); // Afficher la réponse de l'API
      await fetchWorkspaces(); // Recharger les workspaces après la mise à jour
      setIsUpdateModalVisible(false); // Fermer le modal après la mise à jour
      setNewWorkspaceName("");
    } catch (error) {
      console.error("Erreur lors de la mise à jour du workspace :", error);
    }
  };

  return (
    <View style={globalStyles.container}>
      <TextInput
        style={localStyles.input}
        placeholder="Nom du workspace"
        value={workspaceName}
        onChangeText={setWorkspaceName}
        placeholderTextColor="#ccc"
      />
      <TouchableOpacity style={localStyles.createButton} onPress={createWorkspace}>
        <Text style={localStyles.createButtonText}>Créer un Workspace</Text>
      </TouchableOpacity>
      <ScrollView style={localStyles.workspaceContainer}>
        {workspaces.map((workspace) => (
          <View key={workspace.id} style={localStyles.workspaceItem}>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("BoardManager", {
                  workspaceId: workspace.id,
                })
              }
            >
              <Text style={localStyles.workspaceText}>{workspace.name}</Text>
            </TouchableOpacity>
            <View style={localStyles.actionButtonsContainer}>
              <TouchableOpacity
                style={[localStyles.actionButton, localStyles.updateButton]}
                onPress={() => promptForUpdateWorkspace(workspace.id)}
              >
                <Text style={localStyles.actionButtonText}>Modifier</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[localStyles.actionButton, localStyles.deleteButton]}
                onPress={() => deleteWorkspace(workspace.id)}
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
              placeholder="Nouveau nom du workspace"
              value={newWorkspaceName}
              onChangeText={setNewWorkspaceName}
              placeholderTextColor="#ccc"
            />
            <TouchableOpacity
              style={localStyles.modalButton}
              onPress={handleUpdateWorkspace}
            >
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
  workspaceContainer: {
    marginTop: 20,
  },
  workspaceItem: {
    backgroundColor: "#444",
    padding: 20,
    marginVertical: 8,
    borderRadius: 5,
  },
  workspaceText: {
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
