import { NextPage } from "next";
import Link from "next/link";
import React from "react";

const login: NextPage = () => {
  return (
    <div className="flex flex-col justify-center  min-h-screen p-4">
      <div className="border-2 border-blue-400 w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-lg ">
        <div className="px-6 py-4">
          <h2 className="text-3xl font-bold text-center text-typography-primary-200 ">
            Login
          </h2>
          <form>
            <div className="w-full mt-4">
              <input
                className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-md   focus:border-blue-400  focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300"
                type="email"
                placeholder="Email Address"
                aria-label="Email Address"
              />
            </div>

            <div className="w-full mt-4">
              <input
                className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-md focus:border-blue-400 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300"
                type="password"
                placeholder="Password"
                aria-label="Password"
              />
            </div>

            <div className="flex items-center justify-between mt-4">
              <button
                className="px-4 py-2 leading-5 text-white transition-colors duration-200 transform bg-blue-500 rounded hover:bg-blue-600 focus:outline-none"
                type="button"
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default login;
