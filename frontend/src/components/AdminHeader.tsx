import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import useLogout from "../hooks/useLogout";

const AdminHeader = () => {
  const navigate = useNavigate();
  const [isDropdownOpenAccount, setDropdownOpenAccount] = useState(false);
  const [isDropdownOpenList, setDropdownOpenList] = useState(false);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isWideScreen, setIsWideScreen] = useState(window.innerWidth >= 768);

  const dropdownRefList = useRef<HTMLDivElement>(null);
  const dropdownRefAccount = useRef<HTMLDivElement>(null);

  const { logout } = useLogout();

  const handleViolators = () => navigate("/violatorslist");
  const handleDrivers = () => navigate("/driverslist");
  const handleRegistrations = () => navigate("/registration-list");
  const handleHomePage = () => navigate("/admin");
  const handleChangePassword = () => navigate("/changepassword");
  const handleLogOut = async () => logout();

  const toggleDropdownAccount = () => setDropdownOpenAccount((prev) => !prev);
  const toggleDropdownList = () => setDropdownOpenList((prev) => !prev);
  const toggleMobileMenu = () => setMobileMenuOpen((prev) => !prev);

  useEffect(() => {
    const handleResize = () => setIsWideScreen(window.innerWidth >= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRefList.current &&
        !dropdownRefList.current.contains(event.target as Node)
      ) {
        setDropdownOpenList(false);
      }
      if (
        dropdownRefAccount.current &&
        !dropdownRefAccount.current.contains(event.target as Node)
      ) {
        setDropdownOpenAccount(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="flex w-screen">
      <header className="flex relative items-center md:justify-evenly font-syke-medium w-full p-4 z-50">
        <div className="flex items-center md:w-auto w-full">
          <img
            onClick={handleHomePage}
            src="../assets/5.png"
            alt="Logo"
            className="z-50 object-contain md:w-16 md:h-16 w-12 h-12 transition-transform duration-300 hover:scale-105"
          />
          <h1
            onClick={handleHomePage}
            className="text-md z-50 text-left md:text-xl hover:text-textgreen text-white">
            CodeGreen Gateway
          </h1>
        </div>

        {isWideScreen ? (
          <nav className="flex flex-row space-x-20 text-white font-syke-medium z-50">
            <Link
              to="/encode"
              className="hover:text-textgreen transition-colors">
              Encode
            </Link>

            <div
              className="relative"
              ref={dropdownRefList}>
              <button
                onClick={toggleDropdownList}
                className="hover:text-buttongreen transition-colors z-50">
                Lists
              </button>
              {isDropdownOpenList && (
                <div className="absolute mt-2 w-48 bg-hoverbutton text-white rounded-md shadow-lg">
                  <span
                    onClick={handleViolators}
                    className="z-50 block px-4 py-2 hover:bg-buttongreen cursor-pointer hover:rounded-t-md">
                    Violators List
                  </span>
                  <span
                    onClick={handleDrivers}
                    className=" z-50 block px-4 py-2 hover:bg-buttongreen cursor-pointer">
                    Drivers List
                  </span>
                  <span
                    onClick={handleRegistrations}
                    className="z-50 block px-4 py-2 hover:bg-buttongreen cursor-pointer hover:rounded-b-md">
                    Registrations List
                  </span>
                </div>
              )}
            </div>

            <div
              className="relative z-50"
              ref={dropdownRefAccount}>
              <button
                onClick={toggleDropdownAccount}
                className="hover:text-buttongreen transition-colors">
                Account
              </button>
              {isDropdownOpenAccount && (
                <div className="absolute mt-2 w-48 bg-hoverbutton text-white rounded-md shadow-lg">
                  <span
                    onClick={handleChangePassword}
                    className="block px-4 py-2 hover:bg-buttongreen cursor-pointer hover:rounded-t-md">
                    Change Password
                  </span>
                  <span
                    onClick={handleLogOut}
                    className="block px-4 py-2 hover:bg-buttongreen cursor-pointer hover:rounded-b-md">
                    Log Out
                  </span>
                </div>
              )}
            </div>
          </nav>
        ) : (
          <button
            title="menu"
            onClick={toggleMobileMenu}
            className="text-white md:hidden focus:outline-none block">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
        )}
      </header>

      {!isWideScreen && isMobileMenuOpen && (
        <nav className="flex flex-col absolute font-syke-medium items-center space-y-5 text-white bg-hoverbutton p-4 rounded right-2 top-16 z-50">
          <Link
            to="/encode"
            className="hover:text-textgreen transition-colors">
            Encode
          </Link>

          <div
            className="relative"
            ref={dropdownRefList}>
            <button
              onClick={toggleDropdownList}
              className="hover:text-buttongreen transition-colors">
              Lists
            </button>
            {isDropdownOpenList && (
              <div className="mt-2 w-48 bg-hoverbutton text-white rounded-md shadow-lg">
                <span
                  onClick={handleViolators}
                  className="block px-4 py-2 hover:bg-buttongreen cursor-pointer">
                  Violator's List
                </span>
                <span
                  onClick={handleDrivers}
                  className="block px-4 py-2 hover:bg-buttongreen cursor-pointer">
                  Driver's List
                </span>
                <span
                  onClick={handleRegistrations}
                  className="block px-4 py-2 hover:bg-buttongreen cursor-pointer">
                  Registration's List
                </span>
              </div>
            )}
          </div>

          <div
            className="relative"
            ref={dropdownRefAccount}>
            <button
              onClick={toggleDropdownAccount}
              className="hover:text-buttongreen transition-colors">
              Account
            </button>
            {isDropdownOpenAccount && (
              <div className="mt-2 w-48 bg-hoverbutton text-white rounded-md shadow-lg">
                <span
                  onClick={handleChangePassword}
                  className="block px-4 py-2 hover:bg-buttongreen cursor-pointer">
                  Change Password
                </span>
                <span
                  onClick={handleLogOut}
                  className="block px-4 py-2 hover:bg-buttongreen cursor-pointer">
                  Log Out
                </span>
              </div>
            )}
          </div>
        </nav>
      )}
    </div>
  );
};
export default AdminHeader;
