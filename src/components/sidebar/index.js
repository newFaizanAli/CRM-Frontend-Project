// /components/Sidebar.jsx
import { useContext, useState } from "react";
import { UserRoleContext } from "../../context";
import { RoutePermissions } from "../../utilities/roles";
import { menuOptions } from "../../utilities/menus";
import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  

   const { loginUser, } =
      useContext(UserRoleContext);
      const location = useLocation();
      const [openMenu, setOpenMenu] = useState({});
  

  // Function to check role access
  const isRouteAllowed = (link) => {
    if (!link) return false; 
    const allowedRoles = RoutePermissions[link] || [];
    return allowedRoles.includes(loginUser.type);
  };

    const filterMenu = (menu) => {
    return menu
      .map((item) => {
        if (item.option) {
          const filteredChildren = filterMenu(item.option);
          return filteredChildren.length > 0 ? { ...item, option: filteredChildren } : null;
        } 
        return isRouteAllowed(item.link) ? item : null;
      })
      .filter(Boolean);
  };

  const toggleMenu = (id) => {
    setOpenMenu((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  const filteredMenu = filterMenu(menuOptions);

  return (
    <div className="sidebar bg-gray-800 text-white w-56 h-screen p-2 overflow-y-auto">
      <ul className="space-y-2">
        {filteredMenu.map((menu) => (
          <li key={menu.id}>
            <div
              className="text-md font-semibold pl-2 cursor-pointer hover:bg-gray-700 p-1 rounded-md flex items-center gap-2"
              onClick={() => toggleMenu(menu.id)}
            >
              <span className="material-icons">{menu.icon}</span>
              {menu.title}
            </div>
            {menu.option && openMenu[menu.id] && (
              <ul className="ml-4 mt-1 space-y-1">
                {menu.option.map((subMenu) => (
                  <li key={subMenu.id}>
                    {subMenu.link ? (
                      <Link
                        to={subMenu.link}
                        className={`block text-xs p-1 rounded-md hover:bg-gray-700 flex items-center gap-2 ${
                          location.pathname === subMenu.link ? "bg-gray-700" : ""
                        }`}
                      >
                        <span className="material-icons">{subMenu.icon}</span>
                        {subMenu.title}
                      </Link>
                    ) : (
                      <div
                        className="text-xs pl-2 cursor-pointer hover:bg-gray-700 p-1 rounded-md flex items-center gap-2"
                        onClick={() => toggleMenu(subMenu.id)}
                      >
                        <span className="material-icons">{subMenu.icon}</span>
                        {subMenu.title}
                      </div>
                    )}
                    {subMenu.option && openMenu[subMenu.id] && (
                      <ul className="ml-4 mt-1 space-y-1">
                        {subMenu.option.map((child) => (
                          <li key={child.id}>
                            <Link
                              to={child.link}
                              className={`block text-xs p-1 rounded-md hover:bg-gray-700 flex items-center gap-2 ${
                                location.pathname === child.link ? "bg-gray-700" : ""
                              }`}
                            >
                              <span className="material-icons">{child.icon}</span>
                              {child.title}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
