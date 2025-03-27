import { Outlet, Navigate, useLocation } from "react-router-dom";
import { useContext } from "react";
import { UserRoleContext } from "../../context";
import { RoutePermissions } from "../../utilities/roles";

const ProtectedRoute = () => {
  const { loginUser } = useContext(UserRoleContext);
  const location = useLocation();

  const isRouteAllowed = (path) => {
    const allowedRoles = RoutePermissions[path] || [];
    return allowedRoles.includes(loginUser.type);
  };

  return isRouteAllowed(location.pathname) ? (
    <Outlet />
  ) : (
    <Navigate to="/unauthorized" />
  );
};

export default ProtectedRoute;

