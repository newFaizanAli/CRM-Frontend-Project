import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import "./App.css";
import { useContext, useEffect } from "react";
import { UserRoleContext } from "./context";
import { publicRoutes, adminRoutes } from "./routes/indexRoutes";
import { fetchData, fireToast } from "./utilities/functions";
import ProtectedRoute from "./routes/protected";

import PageNotFound from "./pages/other/PageNotFound";

function App() {
  const { login, setLoginUser, isLogin } = useContext(UserRoleContext);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const result = await fetchData("GET", "/check-auth");
        if (result.token && result.token === true) {
          await setLoginUser(result.loginUser);
          await login();
        }
      } catch (error) {
        fireToast("An error occurred. Please try again.", false);
      }
    };

    checkAuth();
  }, [login, setLoginUser]);

  return (
    <Router>
      <Routes>
        {publicRoutes}

        {isLogin ? (
          <Route element={<ProtectedRoute />}>{adminRoutes}</Route>
        ) : (
          <Route path="*" element={<Navigate to="/login" replace />} />
        )}

        {/* Fallback Route */}
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
