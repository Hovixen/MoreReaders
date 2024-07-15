import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );
 
  const login = async (username, password) => {
    try {
      const res = await axios.post('/login', {username, password});
      setCurrentUser(res.data.user_id);
      localStorage.setItem("user", JSON.stringify(res.data.user_id));
      localStorage.setItem("access_token", res.data.access_token);
      localStorage.setItem("refresh_token", res.data.refresh_token)
      return { success: true }
    } catch (error){
      console.error("`Login error ${error}")
      return { success: false, message: error.res.data.message }
    }    
  };

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);

  return (
    <AuthContext.Provider value={{ currentUser, login }}>
      {children}
    </AuthContext.Provider>
  );
};
