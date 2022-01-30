import React, { useEffect, useState } from "react";
import Link from "next/link";
import { NextRouter, useRouter } from "next/router";
// import axios from "axios";

/**
 *
 * @param {string} currentState
 * @param {string} goodState state in which to show the active classes
 * @param {string} extras stuff to always include
 * @returns
 */
const navButtonClassDecider = (
  currentState: string,
  goodState: string,
  extras: string
) =>
  currentState === goodState
    ? " text-blue-500 border-b-4 border-blue-500 font-semibold " + extras
    : " text-gray-500 font-semibold hover:text-blue-500 transition duration-300 " +
      extras;

export default function Header() {
  const router: NextRouter = useRouter();
  const [user, setUser] = useState({});
  const [currentPage, setCurrentPage] = useState(
    () => router.pathname.split("/")[1]
  );
  const [logged, setLoggedIn] = useState(false);
  const handleLogout = () => {
    localStorage.removeItem("token");
    setLoggedIn(false);
    router.push("/");
  };
  const listItems = [
    {
      name: "Home",
      path: "/",
      auth: false,
    },
  ];

  const AuthListItems = {
    WithAuth() {
      return listItems.filter((item) => item.auth);
    },
    WithoutAuth() {
      return listItems.filter((item) => !item.auth);
    },
  };

  const normLinks = AuthListItems.WithoutAuth();
  const authLinks = AuthListItems.WithAuth();

  // TODO Mobile navbar
  return (
    <>
      <nav className="bg-white shadow-lg p-2">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex justify-between">
            <div className="flex space-x-7">
              <div className="flex flex-col items-center">
                <h1 className="text-2xl font-bold">
                  <Link href="/" passHref>
                    <a className="text-blue-600">
                      <span className="text-xl font-bold">Accounts</span>
                    </a>
                  </Link>
                </h1>{" "}
                <span className="font-semibold text-gray-500 text-lg"></span>
              </div>
            </div>
            {logged ? (
              <>
                <div className="hidden md:flex items-center space-x-1">
                  {authLinks.map((item) => (
                    <Link href={item.path} passHref key={item.name}>
                      <a
                        onClick={() => setCurrentPage(item.path)}
                        className={navButtonClassDecider(
                          currentPage,
                          item.path,
                          "py-2 px-4"
                        )}
                      >
                        {item.name}
                      </a>
                    </Link>
                  ))}
                </div>
                <div className="hidden md:flex items-center space-x-3 ">
                  <Link href="/profile" passHref>
                    <a className="p-3 font-medium text-gray-500 rounded hover:bg-blue-500 hover:text-white transition duration-300">
                      {/* {user?.name ?? (
                        <div style={{ color: "red" }}>Warning, logged out!</div>
                      )} */}
                      Profile
                    </a>
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="p-3 font-medium text-white bg-blue-500 rounded hover:bg-blue-400 transition duration-300"
                  >
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="hidden md:flex items-center space-x-1">
                  {normLinks.map((item) => (
                    <Link href={item.path} passHref key={item.name}>
                      <a
                        onClick={() => setCurrentPage(item.path)}
                        className={navButtonClassDecider(
                          currentPage,
                          item.path,
                          "py-2 px-4"
                        )}
                      >
                        {item.name}
                      </a>
                    </Link>
                  ))}
                </div>
                <div className="hidden md:flex items-center space-x-3 ">
                  <Link href="/login">
                    <a className="p-3 font-medium text-gray-500 rounded hover:bg-blue-500 hover:text-white transition duration-300">
                      Log In
                    </a>
                  </Link>
                </div>
              </>
            )}
            <div className="md:hidden flex items-center">
              <button className="outline-none mobile-menu-button">
                <svg
                  className=" w-6 h-6 text-gray-500 hover:text-blue-500 "
                  x-show="!showMenu"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M4 6h16M4 12h16M4 18h16"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
