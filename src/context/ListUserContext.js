import React, { createContext, useState, useEffect } from "react";

// Create context
export const ListUserContext = createContext();

export const ListUserProvider = ({ children }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/users/");
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <ListUserContext.Provider value={users}>
      {children}
    </ListUserContext.Provider>
  );
};
