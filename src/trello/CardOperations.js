const { fetchWithAuth } = require("./TrelloAPI");

const CardOperations = {
  createCard: async (idList, name, desc = "") => {
    const response = await fetchWithAuth("/cards", "POST", {
      idList,
      name,
      desc,
    });
    return response.json();
  },

  getCard: async (id) => {
    const response = await fetchWithAuth(`/cards/${id}`, "GET");
    return response.json();
  },

  updateCard: async (id, updates) => {
    const response = await fetchWithAuth(`/cards/${id}`, "PUT", updates);
    return response.json();
  },

  deleteCard: async (id) => {
    const response = await fetchWithAuth(`/cards/${id}`, "DELETE");
    return response.json();
  },

  // Add other card operations here
};

module.exports = CardOperations;
