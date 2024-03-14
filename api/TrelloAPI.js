const apiKey = "aa4cc6ae6adca487db900bb23e9c7113";
const token = "ATTAc5e801b026cd1dddae3dad2896e04d94e6f4e1ae0c82639398afcc3e4f0eda81ECFE3A02";

const baseUrl = "https://api.trello.com/1/";

export const TrelloAPI = {
  fetchBoards: async () => {
    const response = await fetch(
      `${baseUrl}members/me/boards?key=${apiKey}&token=${token}`
    );
    return await response.json();
  },
  // Ajoutez ici d'autres appels API pour les listes et les cartes si nécessaire
};
