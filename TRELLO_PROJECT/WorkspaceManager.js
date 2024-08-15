import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  TextInput,
  Text,
  ScrollView,
  TouchableOpacity,
  Modal,
  StyleSheet,
  Alert,
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
  const [isLoading, setIsLoading] = useState(false);

  const fetchWorkspaces = useCallback(async () => {
    setIsLoading(true);
    const url = `https://api.trello.com/1/members/me/organizations?key=${API_KEY}&token=${TOKEN}`;
    try {
      const response = await axios.get(url);
      setWorkspaces(response.data);
      console.log("Workspaces récupérés :", response.data);
    } catch (error) {
      console.error("Erreur lors de la récupération des workspaces :", error);
      Alert.alert("Erreur", "Impossible de récupérer les workspaces");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchWorkspaces();
  }, [fetchWorkspaces]);

  const createWorkspace = async () => {
    if (!workspaceName.trim()) {
      Alert.alert("Erreur", "Le nom du workspace ne peut pas être vide");
      return;
    }

    setIsLoading(true);
    const url = `https://api.trello.com/1/organizations`;
    const data = {
      displayName: workspaceName,
      name: workspaceName.replace(/\s+/g, '').toLowerCase(),
      key: API_KEY,
      token: TOKEN,
    };

    try {
      const response = await axios.post(url, data);
      console.log("Workspace créé :", response.data);
      setWorkspaceName("");
      await fetchWorkspaces();
      Alert.alert("Succès", "Workspace créé avec succès");
    } catch (error) {
      console.error("Erreur lors de la création du workspace :", error);
      Alert.alert("Erreur", "Impossible de créer le workspace");
    } finally {
      setIsLoading(false);
    }
  };

  const deleteWorkspace = async (workspaceId) => {
    setIsLoading(true);
    const url = `https://api.trello.com/1/organizations/${workspaceId}?key=${API_KEY}&token=${TOKEN}`;
    try {
      await axios.delete(url);
      await fetchWorkspaces();
      Alert.alert("Succès", "Workspace supprimé avec succès");
    } catch (error) {
      console.error("Erreur lors de la suppression du workspace :", error);
      Alert.alert("Erreur", "Impossible de supprimer le workspace");
    } finally {
      setIsLoading(false);
    }
  };

  const promptForUpdateWorkspace = (workspaceId) => {
    const workspaceToUpdate = workspaces.find(
      (workspace) => workspace.id === workspaceId
    );
    if (workspaceToUpdate) {
      setUpdatingWorkspaceId(workspaceId);
      setNewWorkspaceName(workspaceToUpdate.displayName);
      setIsUpdateModalVisible(true);
    }
  };

  const handleUpdateWorkspace = async () => {
    if (!newWorkspaceName.trim()) {
      Alert.alert("Erreur", "Le nouveau nom ne peut pas être vide");
      return;
    }

    setIsLoading(true);
    const url = `https://api.trello.com/1/organizations/${updatingWorkspaceId}`;
    const data = {
      displayName: newWorkspaceName,
      key: API_KEY,
      token: TOKEN,
    };

    try {
      const response = await axios.put(url, data);
      console.log("Workspace mis à jour :", response.data);
      
      setWorkspaces(prevWorkspaces => 
        prevWorkspaces.map(workspace => 
          workspace.id === updatingWorkspaceId 
            ? {...workspace, displayName: newWorkspaceName} 
            : workspace
        )
      );

      setIsUpdateModalVisible(false);
      setNewWorkspaceName("");
      Alert.alert("Succès", "Workspace mis à jour avec succès");
    } catch (error) {
      console.error("Erreur lors de la mise à jour du workspace :", error);
      Alert.alert("Erreur", "Impossible de mettre à jour le workspace");
    } finally {
      setIsLoading(false);
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
      <TouchableOpacity 
        style={localStyles.createButton} 
        onPress={createWorkspace}
        disabled={isLoading}
      >
        <Text style={localStyles.createButtonText}>
          {isLoading ? "Chargement..." : "Créer un Workspace"}
        </Text>
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
              <Text style={localStyles.workspaceText}>{workspace.displayName}</Text>
            </TouchableOpacity>
            <View style={localStyles.actionButtonsContainer}>
              <TouchableOpacity
                style={[localStyles.actionButton, localStyles.updateButton]}
                onPress={() => promptForUpdateWorkspace(workspace.id)}
                disabled={isLoading}
              >
                <Text style={localStyles.actionButtonText}>Modifier</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[localStyles.actionButton, localStyles.deleteButton]}
                onPress={() => deleteWorkspace(workspace.id)}
                disabled={isLoading}
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
              disabled={isLoading}
            >
              <Text style={localStyles.modalButtonText}>
                {isLoading ? "Chargement..." : "Mettre à jour"}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[localStyles.modalButton, localStyles.cancelButton]}
              onPress={() => setIsUpdateModalVisible(false)}
              disabled={isLoading}
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
  // ... (styles inchangés)
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