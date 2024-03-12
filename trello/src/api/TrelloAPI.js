// src/api/TrelloAPI.js
const apiKey = "aa4cc6ae6adca487db900bb23e9c7113";
const token = "ATTAc5e801b026cd1dddae3dad2896e04d94e6f4e1ae0c82639398afcc3e4f0eda81ECFE3A02";

const TrelloAPI = {
  baseUrl: "https://api.trello.com/1/",

  fetchBoards: async () => {
    const response = await fetch(
      `${TrelloAPI.baseUrl}members/me/boards?key=${apiKey}&token=${token}`
    );
    return response.json();
  },

  fetchLists: async (boardId) => {
    const response = await fetch(
      `${TrelloAPI.baseUrl}boards/${boardId}/lists?key=${apiKey}&token=${token}`
    );
    return response.json();
  },

  fetchCards: async (listId) => {
    const response = await fetch(
      `${TrelloAPI.baseUrl}lists/${listId}/cards?key=${apiKey}&token=${token}`
    );
    return response.json();
  },

  createCard: async (listId, cardName) => {
    const response = await fetch(
      `${TrelloAPI.baseUrl}cards?key=${apiKey}&token=${token}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: cardName,
          idList: listId,
          pos: "bottom",
        }),
      }
    );
    return response.json();
  },

  updateCard: async (cardId, newName) => {
    const response = await fetch(
      `${TrelloAPI.baseUrl}cards/${cardId}?key=${apiKey}&token=${token}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: newName,
        }),
      }
    );
    return response.json();
  },

  deleteCard: async (cardId) => {
    const response = await fetch(
      `${TrelloAPI.baseUrl}cards/${cardId}?key=${apiKey}&token=${token}`,
      {
        method: "DELETE",
      }
    );
    if (!response.ok) {
      throw new Error("Problème lors de la suppression de la carte");
    }
    return response.json(); // Ou simplement return si vous ne vous attendez pas à un corps de réponse
  },
};

export default TrelloAPI;
