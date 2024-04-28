import React, { createContext, useReducer, useContext, useEffect, useState } from "react";
import axios from "axios";

const AccountContext = createContext();
const id = localStorage.getItem("user_id");

export const AccountProvider = ({ children }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/users/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
          },
        }
      );
      // Update the state with the fetched data
      setData(response.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <AccountContext.Provider value={{ data, loading }}>{children}</AccountContext.Provider>
  );
};
export const useAccountContext = () => useContext(AccountContext);
