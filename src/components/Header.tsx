import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const userName = localStorage.getItem("username");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("role");
    localStorage.removeItem("password");
    navigate("/login");
  };

  const handleViewUser = () => {
    navigate("/edit-user");
  };

  return (
    <header className="bg-teal-900 text-white sm:p-2 md:p-2 lg:p-2 font-quicksand">
      <div className="mx-auto flex justify-between items-center relative 2xl:justify-between">
        <nav className="flex space-x-0.5 px-1 py-1 my-0.5 sm:px-2 sm:py-1 md:px-2 md:py-1 lg:px-0.5 lg:py-1">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `px-1 py-1 rounded-md sm:px-2 sm:py-1 md:px-2 md:py-1 lg:px-5 lg:py-1 ${
                isActive ? "bg-teal-700" : "hover:bg-teal-700"
              }`
            }
          >
            Início
          </NavLink>
          <NavLink
            to="/farms"
            className={({ isActive }) =>
              `px-1 py-1 rounded-md sm:px-2 sm:py-1 md:px-2 md:py-1 lg:px-5 lg:py-1 ${
                isActive ? "bg-teal-700" : "hover:bg-teal-700"
              }`
            }
          >
            Fazendas
          </NavLink>
          <NavLink
            to="/crops"
            className={({ isActive }) =>
              `px-1 py-1 rounded-md sm:px-2 sm:py-1 md:px-2 md:py-1 lg:px-5 lg:py-1 ${
                isActive ? "bg-teal-700" : "hover:bg-teal-700"
              }`
            }
          >
            Plantações
          </NavLink>
          <NavLink
            to="/fertilizers"
            className={({ isActive }) =>
              `px-1 py-1 rounded-md sm:px-2 sm:py-1 md:px-2 md:py-1 lg:px-5 lg:py-1 ${
                isActive ? "bg-teal-700" : "hover:bg-teal-700"
              }`
            }
          >
            Fertilizantes
          </NavLink>
        </nav>

        <div className="relative flex items-center space-x-2 cursor-pointer hover:bg-teal-700 px-1 py-1 rounded-md sm:px-1 sm:py-1 md:px-1 md:py-1 lg:px-1 lg:py-1">
          <span
            className="hidden lg:block text-white cursor-pointer hover:text-gray-200"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {userName}
          </span>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6 text-white-700 cursor-pointer"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <path
              fillRule="evenodd"
              d="M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
              clipRule="evenodd"
            />
          </svg>

          {isMenuOpen && (
            <div className="absolute right-0 bg-teal-500 shadow-md rounded mt-40 w-40 p-2 z-10 flex flex-col items-center justify-center">
              <button
                onClick={handleViewUser}
                className="w-full p-2 hover:bg-teal-600 rounded"
              >
                Ver Usuário
              </button>
              <button
                onClick={handleLogout}
                className="w-full p-2 hover:bg-teal-600 rounded flex items-center justify-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6 mr-2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75"
                  />
                </svg>
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
