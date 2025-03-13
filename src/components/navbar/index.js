import React, { useContext } from "react";
import { UserRoleContext } from "../../context";
import { useNavigate } from "react-router-dom";
import { fetchData } from "../../utilities/functions";

const Index = () => {
  const navigate = useNavigate();
  const { isLogin, logout } = useContext(UserRoleContext);

  const handleLogout = async () => {
    try {
      const resp = await fetchData("GET", "/signout");
      if (resp.token === false) {
        await logout();
        navigate("/");
      }
    } catch (e) {
      console.log(e.message);
    }
  };

  return (
    <nav className="bg-gradient-to-r from-gray-900 to-gray-700 bg-opacity-50 text-white p-4 flex justify-between items-center">
      <div
        className="text-xl font-bold cursor-pointer"
        onClick={() => navigate("/")}
      >
        CRM
      </div>

      {/* Authentication Buttons */}
      <div>
        {isLogin ? (
          <button
            className="bg-gray-800 text-white font-medium px-4 py-2 rounded-xl hover:bg-white hover:text-gray-800 transition duration-300"
            onClick={() => handleLogout()}
          >
            Sign out
          </button>
        ) : (
          <button
            className="bg-gray-800 text-white font-medium px-4 py-2 rounded-xl hover:bg-white hover:text-gray-800 transition duration-300"
            onClick={() => navigate("/signin")}
          >
            Sign In
          </button>
        )}
      </div>
    </nav>
  );
};

export default Index;
