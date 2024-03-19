const { fetchWithAuth } = require("./TrelloAPI");

const BoardOperations = {
  getBoard: async (id) => {
    const response = await fetchWithAuth(`/boards/${id}`, "GET");
    return response.json();
  },

  createBoard: async (name, desc = "", prefs_background = "blue") => {
    const response = await fetchWithAuth("/boards", "POST", {
      name,
      desc,
      prefs_background: prefs_background,
    });
    return response.json();
  },

  updateBoard: async (id, updates) => {
    const response = await fetchWithAuth(`/boards/${id}`, "PUT", updates);
    return response.json();
  },

  deleteBoard: async (id) => {
    const response = await fetchWithAuth(`/boards/${id}`, "DELETE");
    return response.json();
  },

  // Add other board operations here
};

module.exports = BoardOperations;
