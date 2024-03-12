// src/components/Board/Board.js
import React, { useEffect, useState } from "react";
import TrelloAPI from "../../api/TrelloAPI";

const Board = () => {
  const [boards, setBoards] = useState([]);

  useEffect(() => {
    const fetchBoards = async () => {
      const data = await TrelloAPI.fetchBoards();
      setBoards(data);
    };

    fetchBoards();
  }, []);

  return (
    <div>
      <h2>Mes Tableaux</h2>
      <ul>
        {boards.map((board) => (
          <li key={board.id}>{board.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default Board;
