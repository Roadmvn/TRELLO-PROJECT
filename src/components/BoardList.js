import React, { useEffect, useState } from "react";

const BoardList = () => {
  const [boards, setBoards] = useState([]);

  useEffect(() => {
    fetch(
      "https://api.trello.com/1/members/me/boards?key={API_KEY}&token={API_TOKEN}"
    )
      .then((response) => response.json())
      .then((data) => setBoards(data))
      .catch((error) => console.error("Error:", error));
  }, []);

  return (
    <div>
      <h2>My Boards</h2>
      <ul>
        {boards.map((board) => (
          <li key={board.id}>{board.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default BoardList;
