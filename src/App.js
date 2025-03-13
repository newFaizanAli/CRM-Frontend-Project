import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";

import { useContext, useEffect } from "react";
import { UserRoleContext } from "./context";
import PageNotFound from "./pages/other/PageNotFound";
import { publicRoutes, adminRoutes } from "./routes/indexRoutes";
import { fetchData, fireToast } from "./utilities/functions";

const renderRoutesForRole = (userType) => {
  switch (userType) {
    case "admin":
      return adminRoutes;
    default:
      return <Route path="*" element={<PageNotFound />} />;
  }
};

function App() {
  const { isLogin, loginUser, login, setLoginUser } =
    useContext(UserRoleContext);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const result = await fetchData("GET", "/check-auth");

        if (result.token && result.token === true) {
          setLoginUser(result.loginUser);
          await login();
        }
      } catch (error) {
        fireToast("An error occurred. Please try again.", false);
      }
    };

    checkAuth();
  }, []);

  return (
    <Router>
      <Routes>
        {isLogin ? renderRoutesForRole(loginUser.type) : publicRoutes}
      </Routes>
    </Router>
  );
}

export default App;
