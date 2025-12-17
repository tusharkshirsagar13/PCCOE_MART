"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import config from "../../config";
import { 
  LogOut, 
  User, 
  Package, 
  ShoppingBag, 
  Trash2, 
  HelpCircle, 
  Phone, 
  Calendar, 
  ArrowLeft,
  Mail,
  Shield,
  BadgeCheck
} from "lucide-react";

const makeAvatarDataUrl = (name = "User") => {
  const initials = name
    ?.trim()
    ?.split(/\s+/)
    ?.map((n) => n[0])
    ?.slice(0, 2)
    ?.join("")
    ?.toUpperCase() || "U";
  
  const svg = `
  <svg xmlns='http://www.w3.org/2000/svg' width='160' height='160' viewBox='0 0 160 160'>
    <defs>
      <linearGradient id='g' x1='0' y1='0' x2='1' y2='1'>
        <stop offset='0%' stop-color='#8b5cf6'/>
        <stop offset='100%' stop-color='#3b82f6'/>
      </linearGradient>
    </defs>
    <rect rx='80' width='160' height='160' fill='url(#g)'/>
    <text x='50%' y='54%' dominant-baseline='middle' text-anchor='middle'
          font-size='64' font-family='Inter, system-ui, -apple-system, sans-serif'
          fill='white' font-weight='600'>${initials}</text>
  </svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
};

const AccountScreen = () => {
  const [activeTab, setActiveTab] = useState("found");
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [userLoading, setUserLoading] = useState(true);

  const navigate = useNavigate();

  // Check for token on component mount
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Invalid token or session expired");
      navigate("/");
    }
  }, []);

  // Fetch user info
  useEffect(() => {
    const fetchUser = async () => {
      try {
        setUserLoading(true);
        const token = localStorage.getItem("token");
        if (!token) {
          toast.error("Invalid token or session expired");
          navigate("/");
          return;
        }

        const infoEndpoint = `${config.BASE_URL}${config.GET_USER_INFO}`;
        const res = await axios.get(infoEndpoint, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setUser(res.data);
      } catch (e) {
        toast.error(e?.response?.data?.message || "Failed to fetch profile");
      } finally {
        setUserLoading(false);
      }
    };

    fetchUser();
  }, []);

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    toast.success("Logged out successfully");
    navigate("/");
  };

  // Fetch items based on active tab
  useEffect(() => {
    const fetchItems = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          toast.error("Invalid token or session expired");
          navigate("/");
          return;
        }

        const endpoint =
          activeTab === "found"
            ? `${config.BASE_URL}${config.GET_FOUND_BY_USER}`
            : `${config.BASE_URL}${config.GET_PURCHASE_BY_USER}`;

        const response = await axios.get(endpoint, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setItems(response.data.data);
      } catch (error) {
        toast.error(error.response?.data?.message || "Failed to fetch items");
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, [activeTab, navigate]);

  // Helpers
  const safeDate = (iso) => {
    try {
      if (!iso) return "";
      return new Date(iso).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    } catch {
      return "";
    }
  };

  // Handle item deletion
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this item?")) return;
    
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Invalid token or session expired");
        navigate("/");
        return;
      }

      const endpoint =
        activeTab === "found"
          ? `${config.BASE_URL}${config.DELETE_FOUND_BY_ID}`
          : `${config.BASE_URL}${config.DELETE_PURCHASE_BY_ID}`;

      await toast.promise(
        axios.post(
          endpoint,
          { id },
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        ),
        {
          loading: "Deleting item...",
          success: () => {
            setItems((prev) => prev.filter((item) => item._id !== id));
            return "Item deleted successfully";
          },
          error: (error) => error.response?.data?.message || "Failed to delete item",
        },
      );
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  const avatarSrc = makeAvatarDataUrl(user?.name || "User");

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans">
      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate("/purchase")}
                className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-white rounded-lg transition-colors duration-200 border border-gray-200"
              >
                <ArrowLeft className="w-4 h-4" />
                <span className="font-medium">Back to Store</span>
              </button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Account Profile</h1>
                <p className="text-gray-600 mt-1">Manage your account and listings</p>
              </div>
            </div>
            
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors duration-200 border border-red-200 self-start sm:self-auto"
            >
              <LogOut className="w-4 h-4" />
              <span className="font-medium">Logout</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Sidebar - Profile Info */}
          <div className="lg:col-span-1 space-y-6">
            
            {/* Profile Card */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex flex-col items-center text-center">
                {/* Avatar */}
                <div className="relative mb-4">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-r from-violet-600 to-blue-600 p-1">
                    <img
                      src={avatarSrc}
                      alt="Profile"
                      className="w-full h-full rounded-full object-cover"
                    />
                  </div>
                  <div className="absolute -bottom-1 -right-1 bg-green-500 rounded-full p-1 border-2 border-white">
                    <BadgeCheck className="w-4 h-4 text-white" />
                  </div>
                </div>

                {/* User Info */}
                <h2 className="text-xl font-bold text-gray-900 mb-1">
                  {userLoading ? "Loading..." : user?.name || "User"}
                </h2>
                <p className="text-gray-600 text-sm mb-4">Member since {userLoading ? "..." : safeDate(user?.createdAt)}</p>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 w-full mb-6">
                  <div className="text-center">
                    <div className="text-lg font-bold text-gray-900">{items.length}</div>
                    <div className="text-xs text-gray-600">Items</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-gray-900">0</div>
                    <div className="text-xs text-gray-600">Sold</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-gray-900">100%</div>
                    <div className="text-xs text-gray-600">Rating</div>
                  </div>
                </div>

                {/* Contact Info */}
                <div className="w-full space-y-3">
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <Mail className="w-4 h-4 text-gray-400" />
                    <span className="truncate">{userLoading ? "Loading..." : user?.email}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <Phone className="w-4 h-4 text-gray-400" />
                    <span>{userLoading ? "Loading..." : user?.phone || "Not provided"}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <Shield className="w-4 h-4 text-gray-400" />
                    <span>Account verified</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-2">
                <button
                  onClick={() => navigate("/found/upload")}
                  className="w-full flex items-center gap-3 px-4 py-3 text-left text-gray-700 hover:bg-gray-50 rounded-lg transition-colors duration-200"
                >
                  <HelpCircle className="w-5 h-5 text-violet-600" />
                  <span>Report Found Item</span>
                </button>
                <button
                  onClick={() => navigate("/purchase/upload")}
                  className="w-full flex items-center gap-3 px-4 py-3 text-left text-gray-700 hover:bg-gray-50 rounded-lg transition-colors duration-200"
                >
                  <ShoppingBag className="w-5 h-5 text-blue-600" />
                  <span>Sell an Item</span>
                </button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Tab Navigation */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-1">
              <div className="flex">
                <button
                  onClick={() => setActiveTab("found")}
                  className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-medium transition-colors duration-200 ${
                    activeTab === "found"
                      ? "bg-violet-50 text-violet-700 border border-violet-200"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                  }`}
                >
                  <HelpCircle className="w-4 h-4" />
                  Found Items
                </button>
                <button
                  onClick={() => setActiveTab("purchase")}
                  className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-medium transition-colors duration-200 ${
                    activeTab === "purchase"
                      ? "bg-blue-50 text-blue-700 border border-blue-200"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                  }`}
                >
                  <ShoppingBag className="w-4 h-4" />
                  My Listings
                </button>
              </div>
            </div>

            {/* Content Header */}
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">
                  {activeTab === "found" ? "Found Items" : "My Listings"}
                </h2>
                <p className="text-gray-600 text-sm mt-1">
                  {activeTab === "found" 
                    ? "Items you've found and reported" 
                    : "Items you're currently selling"}
                </p>
              </div>
              {!loading && items.length > 0 && (
                <span className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full border border-gray-200">
                  {items.length} items
                </span>
              )}
            </div>

            {/* Items Grid */}
            {loading ? (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-violet-600"></div>
                  <span className="ml-3 text-gray-600">Loading your items...</span>
                </div>
              </div>
            ) : items.length === 0 ? (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Package className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No {activeTab === "found" ? "found items" : "listings"} yet
                </h3>
                <p className="text-gray-600 mb-6 max-w-sm mx-auto">
                  {activeTab === "found" 
                    ? "Start helping others by reporting items you've found around campus."
                    : "List your first item and start selling to the campus community."}
                </p>
                <button
                  onClick={() => navigate(activeTab === "found" ? "/found/upload" : "/purchase/upload")}
                  className="px-6 py-3 bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-700 hover:to-blue-700 text-white font-medium rounded-lg transition-all duration-200 shadow-sm hover:shadow-md"
                >
                  {activeTab === "found" ? "Report Found Item" : "List Item for Sale"}
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {items.map((item) => (
                  <div
                    key={item._id}
                    className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-200 group"
                  >
                    {/* Image Section */}
                    {item.imageUrls?.length > 0 && (
                      <div className="relative aspect-video overflow-hidden">
                        <img
                          src={item.imageUrls[0] || "/placeholder.svg"}
                          alt={item.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                        />
                        <div className="absolute top-3 left-3">
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                            activeTab === "found" 
                              ? "bg-green-100 text-green-800 border border-green-200"
                              : "bg-blue-100 text-blue-800 border border-blue-200"
                          }`}>
                            {activeTab === "found" ? "Found" : "For Sale"}
                          </span>
                        </div>
                        <button
                          onClick={() => handleDelete(item._id)}
                          className="absolute top-3 right-3 p-2 bg-white/90 hover:bg-red-50 text-gray-600 hover:text-red-600 rounded-lg transition-colors duration-200 opacity-0 group-hover:opacity-100 backdrop-blur-sm"
                          title="Delete item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    )}

                    {/* Content Section */}
                    <div className="p-4">
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="font-semibold text-gray-900 line-clamp-1 flex-1 mr-2">
                          {item.name}
                        </h3>
                        {activeTab === "purchase" && (
                          <span className="text-lg font-bold text-green-600 shrink-0">
                            ₹{item.currentPrice}
                          </span>
                        )}
                      </div>

                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                        {item.description}
                      </p>

                      <div className="flex items-center justify-between">
                        <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded border border-gray-200">
                          {item.category}
                        </span>
                        <span className="text-xs text-gray-500">
                          {safeDate(item.createdAt)}
                        </span>
                      </div>

                      {/* Price Details for Purchase Items */}
                      {activeTab === "purchase" && (
                        <div className="mt-3 pt-3 border-t border-gray-100">
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-gray-500">Original:</span>
                            <span className="text-gray-500 line-through">₹{item.oldPrice}</span>
                          </div>
                          <div className="flex items-center justify-between text-xs mt-1">
                            <span className="text-gray-500">Discount:</span>
                            <span className="text-green-600 font-medium">
                              {Math.round((1 - item.currentPrice / item.oldPrice) * 100)}% OFF
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Utility Styles */}
      <style jsx>{`
        .line-clamp-1 {
          overflow: hidden;
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
        }
        .line-clamp-2 {
          overflow: hidden;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }
      `}</style>
    </div>
  );
};

export default AccountScreen;