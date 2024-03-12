// src/components/Workspace/Workspace.js
import React, { useEffect, useState } from "react";
import TrelloAPI from "../../api/TrelloAPI";
import Board from "../Board/Board"; // Assurez-vous d'avoir un composant pour afficher individuellement chaque board

const Workspace = () => {
  const [boards, setBoards] = useState([]);

  useEffect(() => {
    const fetchBoards = async () => {
      try {
        const data = await TrelloAPI.fetchBoards();
        setBoards(data);
      } catch (error) {
        console.error("Erreur lors de la récupération des tableaux : ", error);
      }
    };

    fetchBoards();
  }, []);

  return (
    <div>
      <h1>Espaces de travail</h1>
      {boards.length > 0 ? (
        <div>
          {boards.map((board) => (
            <Board key={board.id} board={board} /> // Le composant Board peut être adapté pour afficher des informations de base sur chaque tableau
          ))}
        </div>
      ) : (
        <p>
          Aucun tableau trouvé. Vous pourriez envisager d'en créer un nouveau.
        </p>
      )}
    </div>
  );
};

export default Workspace;
