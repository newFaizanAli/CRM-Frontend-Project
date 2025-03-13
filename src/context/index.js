import React, { createContext, useState } from "react";

export const UserRoleContext = createContext();

const Context = ({ children }) => {
  const [isLogin, setIsLogin] = useState(false);
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
  };

  return (
    <UserRoleContext.Provider value={contextValue}>
      {children}
    </UserRoleContext.Provider>
  );
};

export default Context;
