import React, { createContext, useState, useContext, useEffect } from 'react';

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [selectedProductId, setSelectedProductId] = useState(null);

  useEffect(() => {
    const storedUser = sessionStorage.getItem('user');
    
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Erro ao parsear o usuário do sessionStorage", error);
      }
    }
  }, []);

  const login = (userData) => {
    if (userData) {
      setUser(userData);
      sessionStorage.setItem('user', JSON.stringify(userData));
    } else {
      console.error("Dados de usuário inválidos.");
    }
  };

  const logout = () => {
    setUser(null);
    sessionStorage.removeItem('user');
  };

  return (
    <UserContext.Provider value={{ user, setUser, login, logout, selectedProductId, setSelectedProductId }}>
      {children}
    </UserContext.Provider>
  );
};
