import axios from "axios";
import { NextPage } from "next";
import React, { useEffect, useMemo, useState } from "react";
import { API_URL } from "../Misc/api";
import SuccessAlert from "../components/Alerts/SuccessAlert";
import ErrorAlert from "../components/Alerts/ErrorAlert";
import { User } from "../types";
import Link from "next/link";
const Login = () => {
  const [user, setUser] = useState<User>({
    ieeeid: "",
    password: "",
  });
  const [error, setError] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    setToken(localStorage.getItem("token"));
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const res = await axios.post(API_URL + "/api/auth", {
        uid: user.ieeeid,
        pwd: user.password,
      });

      if (res.data.ok === true && res.data.auth === true) {
        setSuccess(true);
        localStorage.setItem("token", res.data.atoken);
        localStorage.setItem("isAuthenticated", "true");
        localStorage.setItem("sid", res.data.sid);
        window.location.replace(window.location.origin);
      }
    } catch (err) {
      setError(true);
      setErrorMessage("Some Thing Went Wrong, Please Try Again Later");
    }
  };

  return (
    <>
      {!token ? (
        <>
          {success && <SuccessAlert message="Logged In Successfully" />}
          {error && <ErrorAlert message={errorMessage} />}
          <div className="flex flex-col justify-center  min-h-screen p-4">
            <div className="border-2 border-blue-400 w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-lg ">
              <div className="px-6 py-4">
                <h2 className="text-3xl font-bold text-center text-typography-primary-200 ">
                  Login
                </h2>
                <form onSubmit={handleSubmit}>
                  <div className="w-full mt-4">
                    <input
                      className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-md   focus:border-blue-400  focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300"
                      type="text"
                      placeholder="IEEE ID"
                      aria-label="IEEE ID"
                      onChange={(e) =>
                        setUser({ ...user, ieeeid: e.target.value })
                      }
                    />
                  </div>

                  <div className="w-full mt-4">
                    <input
                      className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-md focus:border-blue-400 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300"
                      type="password"
                      placeholder="Password"
                      aria-label="Password"
                      onChange={(e) =>
                        setUser({ ...user, password: e.target.value })
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between mt-4">
                    <button
                      className="px-4 py-2 leading-5 text-white transition-colors duration-200 transform bg-blue-500 rounded hover:bg-blue-600 focus:outline-none"
                      type="submit"
                    >
                      Login
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="flex flex-col justify-center items-center min-h-screen">
            <h1 className="text-center text-2xl font-bold m-4">
              You are already Logged in{" "}
              <Link href="/" prefetch={true} passHref={true}>
                <a className="text-blue-400 underline">dashboard</a>
              </Link>
            </h1>
          </div>
        </>
      )}
    </>
  );
};

export default Login;
