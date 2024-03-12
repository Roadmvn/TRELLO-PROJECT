// src/components/Card/Card.js
import React, { useState } from "react";
import TrelloAPI from "../../api/TrelloAPI";

const AddCardForm = ({ listId, onAdd }) => {
  const [cardName, setCardName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!cardName) return;
    const newCard = await TrelloAPI.createCard(listId, cardName);
    onAdd(newCard); 
    setCardName(""); 
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={cardName}
        onChange={(e) => setCardName(e.target.value)}
        placeholder="Nouvelle carte"
      />
      <button type="submit">Ajouter</button>
    </form>
  );
};

export default AddCardForm;
