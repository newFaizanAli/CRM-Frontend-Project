import { useState, useRef, useEffect } from "react";
import { fetchData, getInitialName } from "../../../utilities/functions";
import { Link, Navigate } from "react-router-dom";

export default function Index({loginUser, logout}) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  const toggleMenu = () => setIsOpen((prev) => !prev);

  const handleLogout = async () => {
    try {
      const resp = await fetchData("GET", "/signout");
      if (resp.token === false) {
        await logout();
        Navigate("/login");
      }
    } catch (e) {
      console.log(e.message);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative inline-block text-left" ref={menuRef}>
      <button
        onClick={toggleMenu}
        className="px-3 py-2 rounded-[50%] bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-300"
      >
        {getInitialName(loginUser?.name)}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 origin-top-right rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
          <ul className="py-2">
            <li>
              <Link
                className="block w-full text-left px-4 py-2 text-gray-800 font-medium hover:bg-gray-100"
                to={'/profile'}
              >
                Profile
              </Link>
            </li>
            {/* <li>
              <button
                className="block w-full text-left px-4 py-2  text-gray-800 font-medium"
                onClick={() => alert("Settings Clicked")}
              >
                Settings
              </button>
            </li> */}
            <li>
              <button
                className="block w-full text-left px-4 py-2 text-red-500 font-medium hover:bg-gray-100"
                onClick={() => handleLogout()}
              >
                Logout
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
