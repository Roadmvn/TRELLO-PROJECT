import React, { useEffect, useState } from "react";

const CardDetails = ({ cardId }) => {
  const [cardDetails, setCardDetails] = useState({});

  useEffect(() => {
    fetch(
      `https://api.trello.com/1/cards/${cardId}?key={API_KEY}&token={API_TOKEN}`
    )
      .then((response) => response.json())
      .then(setCardDetails)
      .catch((error) => console.error("Error:", error));
  }, [cardId]);

  return (
    <div>
      <h2>Card: {cardDetails.name}</h2>
      <p>Description: {cardDetails.desc}</p>
    </div>
  );
};

export default CardDetails;
