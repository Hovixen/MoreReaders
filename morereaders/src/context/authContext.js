import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );
 
  const login = async (email, password) => {
    try {
      const res = await axios.post('/login', {email, password});
      const user = {
        "id": res.data.user_id,
        "username": res.data.username,
        "profilePic": res.data.profile_picture,
        "access_token": res.data.access_token,
        "refresh_token": res.data.refresh_token
      }
      setCurrentUser(user);
      localStorage.setItem("user", JSON.stringify(user));
      return { success: true }
    } catch (error){
      console.error(`Login error ${error}`)
      const message = "An unknown error occurred";
      return { success: false, message };
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
