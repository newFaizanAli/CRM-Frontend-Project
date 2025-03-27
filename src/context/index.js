import React, { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

export const UserRoleContext = createContext();

const Context = ({ children }) => {

  const [isLogin, setIsLogin] = useState(false);
  const [isLoading, setLoading] = useState(false);
 
  const [loginUser, setLoginUser] = useState({
    name: "",
    email: "",
    type: "",
  });

  const login = () => {
    setIsLogin(true);
  };

  const logout = () => {
    setIsLogin(false);
    setLoginUser({
      name: "",
      email: "",
      type: "",
    });
   
 
  };

  const contextValue = {
    isLogin,
    login,
    logout,
    loginUser,
    setLoginUser,
    isLoading, 
    setLoading
  };

  return (
    <UserRoleContext.Provider value={contextValue}>
      {children}
    </UserRoleContext.Provider>
  );
};

export default Context;
