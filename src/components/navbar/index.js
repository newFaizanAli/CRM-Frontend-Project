import React, { useContext } from "react";
import { UserRoleContext } from "../../context";
import { useNavigate } from "react-router-dom";
import DropdownMenu from "./dropdown";

const Index = () => {
  const navigate = useNavigate();
  const { isLogin, logout, loginUser } = useContext(UserRoleContext);

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
          <>
            <DropdownMenu loginUser={loginUser} logout={logout} />
          </>
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
