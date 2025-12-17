import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import config from "../../config";
import { ArrowLeft, Mail, Shield, CheckCircle, Loader2 } from "lucide-react";

export default function VerifyOtp() {
  const location = useLocation();
  const navigate = useNavigate();
  const { name, email, phone, password } = location.state || {};
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!name || !email || !phone || !password) {
      toast.error("Missing signup details. Redirecting...");
      navigate("/signup");
    }
  }, [name, email, phone, password, navigate]);

  const handleFinalSignup = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post(`${config.BASE_URL}${config.SIGNUP}`, {
        name,
        email,
        phone,
        password,
        otp,
      });

      toast.success("Account created successfully!");
      navigate("/login");
    } catch (err) {
      const msg = err.response?.data?.msg || "Signup failed";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleOtpChange = (e) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 6);
    setOtp(value);
  };

  const handleResendOtp = async () => {
    try {
      await axios.post(`${config.BASE_URL}${config.GET_OTP}`, { email });
      toast.success("New OTP sent to your email!");
    } catch (err) {
      toast.error("Failed to resend OTP. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-white to-blue-50 text-gray-900 font-sans relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-violet-50 via-white to-blue-50"></div>
        <div className="absolute top-20 left-10 w-80 h-80 bg-violet-200/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-200/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-purple-200/20 rounded-full blur-2xl animate-pulse delay-500"></div>
        <div className="absolute inset-0 bg-gradient-to-tr from-violet-100/30 via-transparent to-blue-100/30 opacity-50"></div>
      </div>

      {/* Header */}
      <header className="relative z-20 bg-white/90 backdrop-blur-lg shadow-lg border-b border-violet-200/50">
        <div className="container mx-auto px-4 sm:px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3 cursor-pointer" onClick={() => navigate("/")}>
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-violet-600 to-blue-600 rounded-lg flex items-center justify-center shadow-lg">
                <Shield className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <span className="text-lg sm:text-xl font-bold bg-gradient-to-r from-violet-600 to-blue-600 bg-clip-text text-transparent tracking-tight">
                WALCHAND MART
              </span>
            </div>
            
            <button
              onClick={() => navigate("/signup")}
              className="hidden md:inline-flex items-center px-4 lg:px-5 py-2 sm:py-2.5 text-gray-600 font-medium hover:text-gray-800 transition-colors"
            >
              <ArrowLeft className="mr-2 w-4 h-4" />
              Back to Signup
            </button>
          </div>
        </div>
      </header>

      <main className="relative z-10 flex items-center justify-center p-4 sm:p-6 py-8 sm:py-12">
        <div className="w-full max-w-md sm:max-w-lg mx-auto">
          <div className="bg-white/90 backdrop-blur-lg border border-violet-200/50 rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden">
            {/* Header Section */}
            <div className="bg-white/95 backdrop-blur-md border-b border-violet-200/50 p-6 sm:p-8">
              <div className="text-center">
                <div className="relative inline-block mb-4 sm:mb-6">
                  <div className="absolute inset-0 bg-gradient-to-r from-violet-600/30 to-blue-600/30 rounded-full blur-xl opacity-80 animate-pulse"></div>
                  <div className="relative w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-white to-gray-50 rounded-2xl border border-violet-200 flex items-center justify-center mx-auto shadow-xl">
                    <Mail className="w-8 h-8 sm:w-10 sm:h-10 text-violet-500" />
                  </div>
                </div>
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Verify Your Email</h1>
                <p className="text-gray-600 text-sm sm:text-base">
                  We've sent a 6-digit verification code to
                </p>
                <p className="text-violet-600 font-semibold mt-1 break-all">
                  {email}
                </p>
              </div>
            </div>

            {/* Form Section */}
            <div className="p-6 sm:p-8">
              <form onSubmit={handleFinalSignup} className="space-y-6">
                {/* OTP Input */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3 text-center">
                    Enter Verification Code
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={otp}
                      onChange={handleOtpChange}
                      className="w-full px-4 py-4 sm:py-5 bg-white/80 border border-violet-200/60 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all duration-200 text-center text-2xl sm:text-3xl tracking-[0.5em] font-mono"
                      placeholder="••••••"
                      maxLength="6"
                      required
                    />
                    <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                      {otp.length === 6 && (
                        <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-green-500" />
                      )}
                    </div>
                  </div>
                  <p className="mt-2 text-xs sm:text-sm text-gray-500 text-center">
                    Enter the 6-digit code from your email
                  </p>
                </div>

                {/* Progress Indicator */}
                <div className="flex justify-center">
                  <div className="flex space-x-2">
                    {[...Array(6)].map((_, index) => (
                      <div
                        key={index}
                        className={`w-3 h-3 rounded-full transition-all duration-200 ${
                          index < otp.length
                            ? 'bg-violet-500'
                            : 'bg-gray-200'
                        }`}
                      />
                    ))}
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading || otp.length !== 6}
                  className="w-full py-4 sm:py-4 px-4 bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-700 hover:to-blue-700 text-white font-bold text-sm sm:text-base rounded-xl shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center transition-all duration-300 transform hover:scale-[1.02] active:scale-95 disabled:transform-none"
                >
                  {loading ? (
                    <>
                      <Loader2 className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" />
                      <span>Verifying...</span>
                    </>
                  ) : (
                    <>
                      <CheckCircle className="w-5 h-5 mr-2" />
                      Complete Signup
                    </>
                  )}
                </button>
              </form>

              {/* Resend Section */}
              <div className="mt-6 text-center">
                <p className="text-sm text-gray-600 mb-3">Didn't receive the code?</p>
                <button
                  onClick={handleResendOtp}
                  className="text-violet-600 hover:text-violet-700 font-semibold text-sm hover:underline transition-all duration-200"
                >
                  Resend verification code
                </button>
              </div>

              {/* Help Text */}
              <div className="mt-6 p-4 bg-violet-50/80 backdrop-blur-sm border border-violet-200/50 rounded-xl">
                <div className="flex items-start space-x-3">
                  <Shield className="w-5 h-5 text-violet-600 mt-0.5 flex-shrink-0" />
                  <div className="text-sm text-gray-700">
                    <p className="font-semibold mb-1">Verification Help</p>
                    <ul className="text-xs space-y-1 text-gray-600">
                      <li>• Check your email inbox and spam folder</li>
                      <li>• The code expires in 10 minutes</li>
                      <li>• Contact support if you don't receive the code</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Back to Signup - Mobile */}
              <div className="mt-6 md:hidden">
                <button
                  onClick={() => navigate("/signup")}
                  className="w-full py-3 px-4 bg-white/80 border border-violet-200/60 text-gray-700 font-medium rounded-xl backdrop-blur-sm flex items-center justify-center transition-all duration-200 hover:bg-white"
                >
                  <ArrowLeft className="mr-2 w-4 h-4" />
                  Back to Signup
                </button>
              </div>
            </div>
          </div>

          {/* Additional Info */}
          <div className="mt-6 text-center">
            <div className="inline-flex items-center px-4 py-2 bg-white/80 backdrop-blur-sm border border-violet-200/40 rounded-lg text-xs sm:text-sm text-gray-600">
              <Shield className="w-4 h-4 text-green-500 mr-2" />
              <span>Your data is secure and encrypted</span>
            </div>
          </div>
        </div>
      </main>

      {/* Styles */}
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
