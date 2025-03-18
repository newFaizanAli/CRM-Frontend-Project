import { useState } from "react";
import { Link } from "react-router-dom";

const Index = ({ options = [], isSidebarOpen }) => {
  const [activeMenu, setActiveMenu] = useState(null);
  const [activeSubMenu, setActiveSubMenu] = useState(null);

  const toggleSubItems = (id) => {
    setActiveMenu(activeMenu === id ? null : id);
  };

  const toggleSubSubItems = (id) => {
    setActiveSubMenu(activeSubMenu === id ? null : id);
  };

  return (
    <div
      className={`
        fixed top-0 left-0 h-full bg-gray-800 text-white p-5 w-64 z-50 
        transition-transform duration-300 ease-in-out
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} 
        sm:relative sm:translate-x-0
      `}
    >
      {/* Sidebar Header */}
      <Link className="text-2xl font-bold mb-6 flex items-center gap-2" to={"/"}>
        <span className="material-icons text-green-400">admin_panel_settings</span>
        Admin Panel
      </Link>

      {/* Close Sidebar Button */}
      <button
        // onClick={toggleSidebar}
        className="sm:hidden p-2 bg-blue-500 text-white rounded-md mb-4"
      >
        {isSidebarOpen ? "Close Menu" : "Open Menu"}
      </button>

      {/* Sidebar Options */}
      {options.map((option) => (
        <div key={option.id} className="mb-4">
          {/* Main Menu Item */}
          <div
            className="cursor-pointer font-semibold flex items-center gap-3 mb-2 hover:text-gray-300"
            onClick={() => toggleSubItems(option.id)}
          >
            <span className="material-icons">{option.icon}</span>
            {option.title}
            <span className="material-icons ml-auto">
              {activeMenu === option.id ? "expand_less" : "expand_more"}
            </span>
          </div>

          {/* Sub Menu Level 1 */}
          <ul className={`${activeMenu === option.id ? "block" : "hidden"} pl-6 space-y-2`}>
            {Array.isArray(option.option) && option.option.length > 0 ? (
              option.option.map((subOption) => (
                <li key={subOption.id}>
                  <div>
                    {/* Sub-Menu Item */}
                    <div
                      className="cursor-pointer flex items-center gap-3 mb-2 hover:text-gray-300"
                      onClick={() => toggleSubSubItems(subOption.id)}
                    >
                      <span className="material-icons">{subOption.icon}</span>
                      {subOption.title}
                      {subOption.option && (
                        <span className="material-icons ml-auto">
                          {activeSubMenu === subOption.id ? "expand_less" : "expand_more"}
                        </span>
                      )}
                    </div>

                    {/* Sub Menu Level 2 */}
                    <ul className={`${activeSubMenu === subOption.id ? "block" : "hidden"} pl-6 space-y-1`}>
                      {Array.isArray(subOption.option) &&
                        subOption.option.map((nestedOption) => (
                          <li key={nestedOption.id}>
                            <Link
                              to={nestedOption.link}
                              className="text-blue-300 hover:text-blue-500 flex items-center gap-2"
                            >
                              <span className="material-icons">{nestedOption.icon}</span>
                              {nestedOption.title}
                            </Link>
                          </li>
                        ))}
                    </ul>
                  </div>
                </li>
              ))
            ) : (
              <li>No Sub-options available</li>
            )}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default Index;
