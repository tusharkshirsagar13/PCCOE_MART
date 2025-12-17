"use client";

import { useState } from "react";
import axios from "axios";
import config from "../../config";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import {
  ShoppingBag,
  HelpCircle,
  Package,
  Upload,
  User,
  Tag,
  FileText,
  ImageIcon,
  Loader2,
  MapPin,
  ArrowLeft,
  Menu,
  X,
} from "lucide-react";

const categories = ["Books", "Electronics", "Stationery", "Clothing", "Others"];

// Sidebar Component
function Sidebar({ sidebarOpen, setSidebarOpen, navigate }) {
  return (
    <>
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/20 z-40 lg:hidden backdrop-blur-sm"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <div
        className={`${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 fixed lg:static inset-y-0 left-0 z-50 w-80 bg-white/80 backdrop-blur-lg border-r border-violet-200/50 transition-transform duration-300 ease-in-out shadow-xl`}
      >
        <div className="p-6 h-full overflow-y-auto">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <div
                className="flex items-center space-x-3 cursor-pointer"
                onClick={() => navigate("/")}
              >
                <div className="w-12 h-12 bg-gradient-to-br from-violet-600 to-blue-600 rounded-lg flex items-center justify-center shadow-lg">
                  <Package className="w-6 h-6 text-white" />
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-violet-600 to-blue-600 bg-clip-text text-transparent tracking-tight">
                  PCCOE MART
                </span>
              </div>
              <button
                onClick={() => setSidebarOpen(false)}
                className="lg:hidden p-2 hover:bg-violet-100/50 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>
            <p className="text-gray-600 text-sm">Found Item Dashboard</p>
          </div>

          {/* Navigation */}
          <nav className="space-y-3 mb-8">
            <button
              onClick={() => navigate("/purchase")}
              className="flex items-center w-full text-left px-4 py-3 bg-white/60 hover:bg-white/80 border border-violet-200/60 text-gray-700 hover:text-gray-900 font-medium rounded-xl transition-all duration-300 transform hover:scale-[1.02] active:scale-95"
            >
              <ShoppingBag className="w-5 h-5 mr-3" />
              Purchase Something
            </button>
            <button
              onClick={() => navigate("/found")}
              className="flex items-center w-full text-left px-4 py-3 bg-white/60 hover:bg-white/80 border border-violet-200/60 text-gray-700 hover:text-gray-900 font-medium rounded-xl transition-all duration-300 transform hover:scale-[1.02] active:scale-95"
            >
              <HelpCircle className="w-5 h-5 mr-3" />
              Lost Something?
            </button>
            <button
              onClick={() => navigate("/found/upload")}
              className="flex items-center w-full text-left px-4 py-3 bg-gradient-to-r from-violet-600 to-blue-600 text-white font-medium rounded-xl shadow-lg hover:shadow-violet-500/20 transition-all duration-300 transform hover:scale-[1.02] active:scale-95"
            >
              <Package className="w-5 h-5 mr-3" />
              Found Something?
            </button>
            <button
              onClick={() => navigate("/purchase/upload")}
              className="flex items-center w-full text-left px-4 py-3 bg-white/60 hover:bg-white/80 border border-violet-200/60 text-gray-700 hover:text-gray-900 font-medium rounded-xl transition-all duration-300 transform hover:scale-[1.02] active:scale-95"
            >
              <Upload className="w-5 h-5 mr-3" />
              Sell Something?
            </button>
          </nav>

          {/* Tips Section */}
          <div className="p-4 bg-gradient-to-br from-violet-100/80 to-blue-100/80 backdrop-blur-sm rounded-xl border border-violet-200/50 shadow-lg">
            <h3 className="text-violet-700 font-semibold mb-3 flex items-center">
              <MapPin className="w-4 h-4 mr-2" />
              Found Item Tips
            </h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-start">
                <span className="text-violet-500 mr-2 mt-0.5">•</span>
                Take clear photos of the item
              </li>
              <li className="flex items-start">
                <span className="text-violet-500 mr-2 mt-0.5">•</span>
                Note where you found it
              </li>
              <li className="flex items-start">
                <span className="text-violet-500 mr-2 mt-0.5">•</span>
                Include distinctive features
              </li>
              <li className="flex items-start">
                <span className="text-violet-500 mr-2 mt-0.5">•</span>
                Respond to inquiries quickly
              </li>
            </ul>
          </div>

          {/* Help Section */}
          <div className="mt-6 p-3 bg-white/60 backdrop-blur-sm border border-violet-200/40 rounded-lg text-center">
            <div className="text-2xl mb-2">🔍</div>
            <div className="text-xs font-semibold text-gray-700">
              Help Others Find
            </div>
            <div className="text-xs text-gray-600">Their lost belongings</div>
          </div>
        </div>
      </div>
    </>
  );
}

export default function UploadFoundScreen() {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
  });
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFileChange = (e) => {
    setImages([...e.target.files]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim()) return toast.error("Item name is required");
    if (!formData.description.trim())
      return toast.error("Description is required");
    if (!formData.category) return toast.error("Please select a category");
    if (images.length === 0)
      return toast.error("Please upload at least one image");

    setLoading(true);
    try {
      const data = new FormData();
      Object.entries(formData).forEach(([key, value]) =>
        data.append(key, value)
      );
      images.forEach((file) => data.append("images", file));

      await axios.post(`${config.BASE_URL}${config.UPLOAD_FOUND}`, data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Found item uploaded successfully!");
      setFormData({ name: "", description: "", category: "" });
      setImages([]);
    } catch (err) {
      toast.error(err.response?.data?.message || "Upload failed");
    } finally {
      setLoading(false);
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

      <div className="flex min-h-screen relative z-10">
        {/* Sidebar */}
        <Sidebar
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          navigate={navigate}
        />

        {/* Main content */}
        <div className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto max-h-screen">
          {/* Header */}
          <div className="mb-6 sm:mb-8 bg-white/90 backdrop-blur-lg border border-violet-200/50 p-4 sm:p-6 rounded-2xl shadow-xl">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setSidebarOpen(true)}
                  className="lg:hidden p-2 hover:bg-violet-100/50 rounded-lg transition-colors"
                >
                  <Menu className="w-5 h-5 text-gray-600" />
                </button>
                <button
                  onClick={() => navigate("/found")}
                  className="flex items-center px-3 py-2 bg-white/60 hover:bg-white/80 border border-violet-200/60 text-gray-700 hover:text-gray-900 font-medium rounded-lg transition-all duration-300 transform hover:scale-[1.02] active:scale-95"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back
                </button>
                <div>
                  <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
                    Report Found Item
                  </h1>
                  <p className="text-gray-600 text-sm">
                    Help reunite students with their belongings
                  </p>
                </div>
              </div>
              <button
                onClick={() => navigate("/account")}
                className="p-2 sm:p-3 bg-gradient-to-br from-violet-600 to-blue-600 hover:from-violet-700 hover:to-blue-700 rounded-lg sm:rounded-xl transition-all duration-300 shadow-lg hover:shadow-violet-500/20 transform hover:scale-[1.02] active:scale-95"
                title="Go to Profile"
              >
                <User className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </button>
            </div>
          </div>

          {/* Centered Upload Form Card */}
          <div className="max-w-2xl mx-auto">
            <div className="bg-white/90 backdrop-blur-lg border border-violet-200/50 rounded-2xl shadow-xl overflow-hidden">
              <div className="p-4 sm:p-6 border-b border-violet-200/50 bg-white/95">
                <div className="flex items-center justify-center">
                  <div className="flex items-center">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-violet-600 to-blue-600 rounded-lg flex items-center justify-center shadow-lg mr-3">
                      <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                    </div>
                    <h2 className="text-lg sm:text-xl font-bold text-gray-900">
                      Item Details
                    </h2>
                  </div>
                </div>
              </div>

              <div className="p-4 sm:p-6 max-h-[calc(100vh-280px)] sm:max-h-[calc(100vh-320px)] overflow-y-auto">
                <form
                  onSubmit={handleSubmit}
                  className="space-y-4 sm:space-y-5"
                >
                  {/* Item Name */}
                  <div>
                    <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
                      <Tag className="w-4 h-4 mr-2" />
                      Item Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      placeholder="What did you find?"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-3 sm:px-4 py-3 sm:py-3.5 bg-white/80 border border-violet-200/60 rounded-lg sm:rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all duration-300 text-sm sm:text-base"
                      required
                    />
                  </div>

                  {/* Description with AI */}
                  {/* <div>
                    <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
                      <FileText className="w-4 h-4 mr-2" />
                      Description
                    </label>
                    <div className="space-y-3">
                      <div className="relative">
                        <textarea
                          name="description"
                          placeholder="Enter short description and click AI generate (you can edit later)..."
                          value={formData.description}
                          onChange={handleInputChange}
                          rows={3}
                          className="w-full px-3 sm:px-4 py-3 sm:py-3.5 bg-white/80 border border-violet-200/60 rounded-lg sm:rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all duration-300 resize-none text-sm sm:text-base max-h-24 overflow-y-auto"
                          required
                        />
                      </div>
                      <button
                        type="button"
                        onClick={generateAIDescription}
                        disabled={aiLoading}
                        className="w-full sm:w-auto px-4 py-2.5 sm:py-3 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-medium rounded-lg sm:rounded-xl transition-all duration-300 shadow-lg hover:shadow-blue-500/20 transform hover:scale-[1.02] active:scale-95 flex items-center justify-center text-sm sm:text-base disabled:opacity-70 disabled:cursor-not-allowed"
                      >
                        {aiLoading ? (
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        ) : (
                          <Sparkles className="w-4 h-4 mr-2" />
                        )}
                        {aiLoading ? "Generating..." : "AI Generate"}
                      </button>
                    </div>
                  </div> */}

                  {/* Description */}
                  <div>
                    <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
                      <FileText className="w-4 h-4 mr-2" />
                      Description
                    </label>
                    <div className="relative">
                      <textarea
                        name="description"
                        placeholder="Enter description of the item..."
                        value={formData.description}
                        onChange={handleInputChange}
                        rows={3}
                        className="w-full px-3 sm:px-4 py-3 sm:py-3.5 bg-white/80 border border-violet-200/60 rounded-lg sm:rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all duration-300 resize-none text-sm sm:text-base max-h-24 overflow-y-auto"
                        required
                      />
                    </div>
                  </div>

                  {/* Category */}
                  <div>
                    <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
                      <Package className="w-4 h-4 mr-2" />
                      Category
                    </label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      className="w-full px-3 sm:px-4 py-3 sm:py-3.5 bg-white/80 border border-violet-200/60 rounded-lg sm:rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all duration-300 appearance-none cursor-pointer text-sm sm:text-base"
                      required
                    >
                      <option value="">Select Category</option>
                      {categories.map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Image Upload */}
                  <div>
                    <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
                      <ImageIcon className="w-4 h-4 mr-2" />
                      Upload Images
                    </label>
                    <div className="relative">
                      <input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={handleFileChange}
                        className="w-full px-3 sm:px-4 py-3 sm:py-3.5 bg-white/80 border border-violet-200/60 rounded-lg sm:rounded-xl text-gray-900 file:mr-3 file:py-1.5 file:px-3 file:rounded-md file:border-0 file:text-xs file:font-medium file:bg-violet-600 file:text-white hover:file:bg-violet-700 file:cursor-pointer cursor-pointer transition-all duration-300 text-sm sm:text-base"
                        required
                      />
                    </div>
                    {images.length > 0 && (
                      <div className="mt-3 p-3 bg-violet-50/80 backdrop-blur-sm border border-violet-200/50 rounded-lg">
                        <p className="text-sm text-gray-600">
                          <span className="text-violet-600 font-semibold">
                            {images.length}
                          </span>{" "}
                          image(s) selected
                        </p>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {Array.from(images)
                            .slice(0, 3)
                            .map((file, index) => (
                              <span
                                key={index}
                                className="inline-block px-2 py-1 bg-violet-100 text-violet-700 text-xs rounded-full"
                              >
                                {file.name.slice(0, 15)}...
                              </span>
                            ))}
                          {images.length > 3 && (
                            <span className="inline-block px-2 py-1 bg-violet-100 text-violet-700 text-xs rounded-full">
                              +{images.length - 3} more
                            </span>
                          )}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Submit Button */}
                  <div className="pt-4 border-t border-violet-200/50">
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full flex items-center justify-center px-6 py-3 sm:py-3.5 bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-700 hover:to-blue-700 text-white font-semibold text-sm sm:text-base rounded-lg sm:rounded-xl transition-all duration-300 shadow-lg hover:shadow-violet-500/20 transform hover:scale-[1.02] active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
                    >
                      {loading ? (
                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      ) : (
                        <Package className="w-5 h-5 mr-2" />
                      )}
                      {loading ? "Uploading..." : "Report Found Item"}
                    </button>
                  </div>
                </form>
              </div>
            </div>

            {/* Success Tips */}
            <div className="mt-6 p-4 bg-white/80 backdrop-blur-sm border border-violet-200/50 rounded-xl shadow-lg">
              <div className="text-center">
                <div className="text-2xl mb-2">🤝</div>
                <h3 className="font-semibold text-gray-700 mb-1">
                  Help Build Our Campus Community
                </h3>
                <p className="text-sm text-gray-600">
                  Every found item helps a fellow student. Thank you for being
                  part of our safe campus marketplace!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

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
