// src/components/List/List.js
import React, { useEffect, useState } from "react";
import TrelloAPI from "../../api/TrelloAPI";

const List = ({ boardId }) => {
  const [lists, setLists] = useState([]);

  useEffect(() => {
    const fetchLists = async () => {
      const data = await TrelloAPI.fetchLists(boardId);
      setLists(data);
    };

    fetchLists();
  }, [boardId]);

  return (
    <div>
      <h3>Listes</h3>
      <ul>
        {lists.map((list) => (
          <li key={list.id}>{list.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default List;
