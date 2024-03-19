import React, { useEffect, useState } from "react";

const BoardDetails = ({ boardId }) => {
  const [boardDetails, setBoardDetails] = useState({});
  const [cards, setCards] = useState([]);

  useEffect(() => {
    fetch(
      `https://api.trello.com/1/boards/${boardId}?key={API_KEY}&token={API_TOKEN}`
    )
      .then((response) => response.json())
      .then((data) => {
        setBoardDetails(data);
        return fetch(
          `https://api.trello.com/1/boards/${boardId}/cards?key={API_KEY}&token={API_TOKEN}`
        );
      })
      .then((response) => response.json())
      .then(setCards)
      .catch((error) => console.error("Error:", error));
  }, [boardId]);

  return (
    <div>
      <h2>Board: {boardDetails.name}</h2>
      <h3>Cards:</h3>
      <ul>
        {cards.map((card) => (
          <li key={card.id}>{card.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default BoardDetails;
