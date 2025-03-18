import React, { useContext, useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../../components/sidebar";
import Navbar from "../../components/navbar";
import { UserRoleContext } from "../../context";
import { adminOptions } from "../../utilities/menus";

const Index = () => {
  const { isLogin } = useContext(UserRoleContext);
  const [activeMenu, setActiveMenu] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); 

  const toggleSubItems = (id) => {
    setActiveMenu(activeMenu === id ? null : id);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <Navbar />

      <div className="flex bg-gradient-to-b from-indigo-50 to-orange-50 h-screen">
        {isLogin && (
          <Sidebar
            options={adminOptions}
            isSidebarOpen={isSidebarOpen}
            activeMenu={activeMenu}
            toggleSubItems={toggleSubItems}
            isModalOpen={isModalOpen} 
            toggleSidebar={toggleSidebar}
          />
        )}

        <div
          className={`flex-1 h-screen p-6 bg-gray-100 overflow-auto ${
            isModalOpen ? "opacity-50 pointer-events-none" : ""
          }`} 
        >
          {isLogin && (
            <button
              onClick={toggleSidebar}
              className="sm:hidden p-2 bg-blue-500 text-white rounded-md mb-4"
            >
              {isSidebarOpen ? "Close Menu" : "Open Menu"}
            </button>
          )}

      
          <Outlet context={{ setIsModalOpen }} />
        </div>
      </div>
    </>
  );
};

export default Index;
