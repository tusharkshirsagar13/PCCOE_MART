"use client";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import config from "../../config";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post(`${config.BASE_URL}${config.LOGIN}`, {
        email,
        password,
      });
      const { token } = res.data;
      localStorage.setItem("token", token);
      toast.success("Welcome back to Walchand Mart!");
      navigate("/purchase");
    } catch (error) {
      const msg =
        error.response?.data?.msg || "Something went wrong. Please try again.";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-white to-blue-50 text-gray-900 font-sans relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-violet-50 via-white to-blue-50"></div>
        <div className="absolute top-20 left-10 w-80 h-80 bg-violet-200/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-200/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-purple-200/20 rounded-full blur-2xl animate-pulse delay-500"></div>
        <div className="absolute inset-0 bg-gradient-to-tr from-violet-100/30 via-transparent to-blue-100/30 opacity-50"></div>
      </div>

      <header className="relative z-20 bg-white/90 backdrop-blur-lg shadow-lg border-b border-violet-200/50">
        <div className="container mx-auto px-4 sm:px-6 py-4">
          <div className="flex justify-between items-center">
            <div
              className="flex items-center space-x-3 cursor-pointer"
              onClick={() => navigate("/")}
            >
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-violet-600 to-blue-600 rounded-lg flex items-center justify-center shadow-lg">
                <svg
                  className="w-5 h-5 sm:w-6 sm:h-6 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                  />
                </svg>
              </div>
              <span className="text-lg sm:text-xl font-bold bg-gradient-to-r from-violet-600 to-blue-600 bg-clip-text text-transparent tracking-tight">
                PCCOE MART
              </span>
            </div>

            <button
              onClick={() => navigate("/")}
              className="hidden md:inline-flex items-center px-4 lg:px-5 py-2 sm:py-2.5 text-gray-600 font-medium"
            >
              <svg
                className="mr-2 w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              Back to Home
            </button>
          </div>
        </div>
      </header>

      <main className="relative z-10 flex items-center justify-center min-h-[calc(100vh-80px)] p-4 sm:p-6">
        <div className="w-full max-w-md">
          <div className="bg-white/90 backdrop-blur-md border border-violet-200/50 rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-2xl">
            <div className="text-center mb-6 sm:mb-8">
              <div className="relative inline-block mb-4 sm:mb-6">
                <div className="absolute inset-0 bg-gradient-to-r from-violet-600/30 to-blue-600/30 rounded-full blur-xl opacity-80 animate-pulse"></div>
                <div className="relative w-16 h-16 sm:w-18 sm:h-18 bg-gradient-to-br from-white to-gray-100 rounded-xl border border-violet-200 flex items-center justify-center mx-auto shadow-xl">
                  <svg
                    className="w-8 h-8 sm:w-9 sm:h-9 text-violet-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </div>
              </div>

              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                Welcome Back
              </h1>
              <p className="text-gray-600 text-base sm:text-lg">
                Sign in to your campus marketplace
              </p>
              <p className="text-violet-600 text-sm mt-1 font-semibold">
                PCCOE College Students Only
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  College Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 sm:py-3.5 bg-white/80 border border-violet-200/60 rounded-lg sm:rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all duration-200 backdrop-blur-sm text-sm sm:text-base"
                  placeholder="yourname.surname@pccoepune.org"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 sm:py-3.5 bg-white/80 border border-violet-200/60 rounded-lg sm:rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all duration-200 backdrop-blur-sm text-sm sm:text-base"
                  placeholder="your secure password"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 sm:py-3.5 px-4 bg-gradient-to-r from-violet-600 to-blue-600 text-white font-bold text-sm sm:text-base rounded-lg sm:rounded-xl shadow-lg disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center"
              >
                {loading ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-3 h-4 w-4 sm:h-5 sm:w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    <span className="text-sm sm:text-base">
                      Signing you in...
                    </span>
                  </>
                ) : (
                  <>
                    <span>Sign In to Campus</span>
                    <svg
                      className="ml-2 w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                      />
                    </svg>
                  </>
                )}
              </button>
            </form>

            <div className="my-6 sm:my-8">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-violet-200/60"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white/90 text-gray-500 font-medium">
                    New to campus?
                  </span>
                </div>
              </div>
            </div>

            <div className="text-center">
              <p className="text-gray-500 text-sm mb-4">
                {"Don't have an account yet?"}
              </p>
              <button
                onClick={() => navigate("/signup")}
                className="w-full py-3 sm:py-3.5 px-4 bg-white/80 border border-violet-200/60 text-gray-900 font-bold text-sm sm:text-base rounded-lg sm:rounded-xl backdrop-blur-sm flex items-center justify-center"
              >
                <span>Create Student Account</span>
                <svg
                  className="ml-2 w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
              </button>
            </div>
          </div>

          <div className="mt-4 sm:mt-6 text-center">
            <div className="inline-flex items-center px-4 py-2 bg-white/60 backdrop-blur-sm border border-violet-200/40 rounded-lg">
              <svg
                className="w-4 h-4 text-green-500 mr-2"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="text-xs sm:text-sm text-gray-600">
                Secure login for verified students only
              </span>
            </div>
          </div>
        </div>
      </main>

      <style jsx>{`
        @media (prefers-reduced-motion: reduce) {
          .animate-pulse,
          .animate-spin {
            animation: none;
          }
        }
      `}</style>
    </div>
  );
}
