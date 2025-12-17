"use client";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSignIn = () => {
    navigate("/login");
  };

  const handleSignUp = () => {
    navigate("/signup");
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

      <header
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-white/90 backdrop-blur-lg shadow-lg border-b border-violet-200/50"
            : "bg-transparent"
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6 py-4">
          <div className="flex justify-between items-center">
            <div
              className="flex items-center space-x-3 cursor-pointer"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
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

            <div className="flex items-center space-x-3 sm:space-x-4">
              <button
                onClick={handleSignIn}
                className="hidden md:inline-flex items-center px-4 lg:px-5 py-2 sm:py-2.5 text-gray-600 font-medium"
              >
                <span>Sign In</span>
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
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>

              <button
                onClick={handleSignUp}
                className="px-4 sm:px-6 py-2 sm:py-2.5 bg-gradient-to-r from-violet-600 to-blue-600 text-white font-medium text-sm sm:text-base rounded-lg shadow-lg flex items-center"
              >
                <span>Join Campus</span>
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
        </div>
      </header>

      <main className="relative z-10 pt-20 sm:pt-24">
        <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-16 md:py-24">
          <div className="max-w-5xl mx-auto text-center">
            <div className="relative inline-block mb-8 sm:mb-12">
              <div className="absolute inset-0 bg-gradient-to-r from-violet-600/30 to-blue-600/30 rounded-full blur-2xl opacity-80 animate-pulse scale-110"></div>
              <div className="relative w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-white to-gray-100 rounded-2xl border border-violet-200 flex items-center justify-center mx-auto shadow-2xl">
                <svg
                  className="w-10 h-10 sm:w-12 sm:h-12 text-violet-500 animate-pulse"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </div>
            </div>

            <div className="mb-6 sm:mb-8">
              <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-4 sm:mb-6">
                <span className="bg-gradient-to-r from-violet-600 via-blue-500 to-violet-600 bg-clip-text text-transparent tracking-tight">
                  PCCOE MART
                </span>
                <br />
                <span className="text-gray-700 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-normal tracking-wide">
                  Your Campus Marketplace
                </span>
              </h1>
            </div>

            <div className="mb-8 sm:mb-12">
              <p className="text-lg sm:text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed mb-4">
                Connect with fellow students to buy, sell, and find lost items
                within your campus community.
              </p>
              <p className="text-base sm:text-lg text-violet-600 font-semibold">
                ✨ Exclusively for PCCOE College students ✨
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center mb-12 sm:mb-20">
              <button
                onClick={handleSignUp}
                className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-violet-600 via-purple-600 to-blue-600 text-white font-bold text-base sm:text-lg rounded-xl shadow-xl flex items-center justify-center"
              >
                <span>Join Community</span>
                <svg
                  className="ml-3 w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </button>

              <button
                onClick={handleSignIn}
                className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-white/80 border border-violet-200/50 text-gray-900 font-bold text-base sm:text-lg rounded-xl backdrop-blur-sm flex items-center justify-center"
              >
                <span>Sign In</span>
                <svg
                  className="ml-3 w-5 h-5"
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
              </button>
            </div>
          </div>

          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mb-12 sm:mb-20">
              <div className="bg-white/80 backdrop-blur-md border border-violet-200/50 rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-xl">
                <div className="flex items-start mb-6">
                  <div className="flex-shrink-0">
                    <div className="bg-gradient-to-br from-green-500 to-teal-500 p-3 sm:p-4 rounded-xl shadow-lg">
                      <svg
                        className="w-6 h-6 sm:w-7 sm:h-7 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                        />
                      </svg>
                    </div>
                  </div>
                  <div className="ml-4 sm:ml-6">
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">
                      Sell Your Items
                    </h3>
                    <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                      Turn your unused textbooks, electronics, and other items
                      into cash while helping fellow students save money.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                  <div className="flex items-center text-gray-700">
                    <span className="text-lg sm:text-xl mr-2">💰</span>
                    <span className="text-xs sm:text-sm font-medium">
                      Student-friendly pricing
                    </span>
                  </div>
                  <div className="flex items-center text-gray-700">
                    <span className="text-lg sm:text-xl mr-2">🏫</span>
                    <span className="text-xs sm:text-sm font-medium">
                      Safe campus meetups
                    </span>
                  </div>
                  <div className="flex items-center text-gray-700">
                    <span className="text-lg sm:text-xl mr-2">⚡</span>
                    <span className="text-xs sm:text-sm font-medium">
                      Easy listing process
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-white/80 backdrop-blur-md border border-violet-200/50 rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-xl">
                <div className="flex items-start mb-6">
                  <div className="flex-shrink-0">
                    <div className="bg-gradient-to-br from-blue-500 to-cyan-500 p-3 sm:p-4 rounded-xl shadow-lg">
                      <svg
                        className="w-6 h-6 sm:w-7 sm:h-7 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                      </svg>
                    </div>
                  </div>
                  <div className="ml-4 sm:ml-6">
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">
                      Lost & Found
                    </h3>
                    <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                      Found something? Lost something? Our campus-wide network
                      helps reunite students with their belongings.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                  <div className="flex items-center text-gray-700">
                    <span className="text-lg sm:text-xl mr-2">✅</span>
                    <span className="text-xs sm:text-sm font-medium">
                      Verified student postings
                    </span>
                  </div>
                  <div className="flex items-center text-gray-700">
                    <span className="text-lg sm:text-xl mr-2">📍</span>
                    <span className="text-xs sm:text-sm font-medium">
                      Location-based alerts
                    </span>
                  </div>
                  <div className="flex items-center text-gray-700">
                    <span className="text-lg sm:text-xl mr-2">⚡</span>
                    <span className="text-xs sm:text-sm font-medium">
                      Quick item recovery
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-12 sm:mb-20">
              <div className="bg-white/80 backdrop-blur-md border border-violet-200/50 rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg">
                <div className="relative mb-4 sm:mb-6">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-violet-500 to-purple-500 rounded-lg sm:rounded-xl flex items-center justify-center shadow-lg">
                    <svg
                      className="w-6 h-6 sm:w-7 sm:h-7 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                      />
                    </svg>
                  </div>
                  <div className="absolute -top-2 -right-2 text-xl sm:text-2xl">
                    🎓
                  </div>
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3">
                  Verified Students
                </h3>
                <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                  Only authenticated PCCOE students can access the platform
                </p>
              </div>

              <div className="bg-white/80 backdrop-blur-md border border-violet-200/50 rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg">
                <div className="relative mb-4 sm:mb-6">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg sm:rounded-xl flex items-center justify-center shadow-lg">
                    <svg
                      className="w-6 h-6 sm:w-7 sm:h-7 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                      />
                    </svg>
                  </div>
                  <div className="absolute -top-2 -right-2 text-xl sm:text-2xl">
                    🔒
                  </div>
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3">
                  Campus Safety
                </h3>
                <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                  All transactions happen within secure campus locations
                </p>
              </div>

              <div className="bg-white/80 backdrop-blur-md border border-violet-200/50 rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg">
                <div className="relative mb-4 sm:mb-6">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-green-500 to-teal-500 rounded-lg sm:rounded-xl flex items-center justify-center shadow-lg">
                    <svg
                      className="w-6 h-6 sm:w-7 sm:h-7 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                      />
                    </svg>
                  </div>
                  <div className="absolute -top-2 -right-2 text-xl sm:text-2xl">
                    💸
                  </div>
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3">
                  Affordable Prices
                </h3>
                <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                  Student-to-student pricing without middleman fees
                </p>
              </div>
            </div>
          </div>

          <div className="max-w-5xl mx-auto text-center bg-white/80 backdrop-blur-md rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12 border border-violet-200/50 shadow-2xl">
            <div className="mb-6 sm:mb-8">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4 sm:mb-6">
                Ready to join your campus marketplace?
              </h2>
              <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Become part of PCCOE's trusted student network today. It only
                takes a minute to get started.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center">
              <button
                onClick={handleSignUp}
                className="px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-violet-600 via-purple-600 to-blue-600 text-white font-bold text-base sm:text-lg rounded-xl shadow-xl"
              >
                Create Account
              </button>

              <button
                onClick={handleSignIn}
                className="px-6 sm:px-8 py-3 sm:py-4 bg-white/80 border border-violet-200/50 text-gray-900 font-bold text-base sm:text-lg rounded-xl"
              >
                Sign In
              </button>
            </div>
          </div>
        </div>
      </main>

      <footer className="relative z-10 bg-violet-50/80 backdrop-blur-md border-t border-violet-200/50 py-6 sm:py-8 mt-8 sm:mt-12">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-gradient-to-br from-violet-600 to-blue-600 rounded-lg flex items-center justify-center shadow-lg">
                <svg
                  className="w-5 h-5 text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </div>
              <span className="text-base sm:text-lg font-bold bg-gradient-to-r from-violet-600 to-blue-600 bg-clip-text text-transparent">
                PCCOE MART
              </span>
            </div>

            <div className="flex space-x-4 sm:space-x-6">
              <a href="#" className="text-gray-600" aria-label="Facebook">
                <svg
                  className="h-5 w-5 sm:h-6 sm:w-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    fillRule="evenodd"
                    d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
              <a href="#" className="text-gray-600" aria-label="Twitter">
                <svg
                  className="h-5 w-5 sm:h-6 sm:w-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              <a href="#" className="text-gray-600" aria-label="Instagram">
                <svg
                  className="h-5 w-5 sm:h-6 sm:w-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
            </div>
          </div>

          <div className="mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-violet-200/50 text-center text-gray-500 text-xs sm:text-sm">
            <p>
              &copy; {new Date().getFullYear()} PCCOE Mart. All rights
              reserved.
            </p>
            <p className="mt-2">
              Exclusively for Pimpri Chinchwad College of Engineering students
              and faculty.
            </p>
          </div>
        </div>
      </footer>

      <style jsx>{`
        @media (prefers-reduced-motion: reduce) {
          .animate-pulse {
            animation: none;
          }
        }
      `}</style>
    </div>
  );
}
