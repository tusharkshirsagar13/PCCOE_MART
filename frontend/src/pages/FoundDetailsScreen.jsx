"use client"

import { useEffect, useState } from "react"
import axios from "axios"
import config from "../../config"
import { useLocation, useNavigate } from "react-router-dom"
import toast from "react-hot-toast"
import { ArrowLeft, Phone, Mail, User, Package, Eye, HelpCircle, Heart, Share2, MapPin, Calendar } from "lucide-react"

export default function FoundDetails() {
  const location = useLocation()
  const navigate = useNavigate()
  const { id } = location.state || {}
  const [item, setItem] = useState(null)
  const [selectedImage, setSelectedImage] = useState("")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [isFavorited, setIsFavorited] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (!token) {
      toast.error("Authorization token missing or invalid")
      navigate("/")
      return
    }

    if (!id) {
      setError("No found item ID provided.")
      setLoading(false)
      return
    }

    const fetchFoundItem = async () => {
      try {
        const token = localStorage.getItem("token")
        const res = await axios.post(
          `${config.BASE_URL}${config.GET_FOUND_DETAILS}`,
          { id },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        )
        setItem(res.data.data)
        setSelectedImage(res.data.data.imageUrls?.[0] || "")
      } catch (err) {
        if (err.response?.status === 401) {
          localStorage.removeItem("token")
          const errorMsg = err.response?.data?.msg || "Invalid or expired token"
          toast.error(errorMsg)
          navigate("/")
          return
        }
        setError(err.response?.data?.message || "Failed to fetch item details.")
        toast.error(err.response?.data?.message || "Failed to fetch item details.")
      } finally {
        setLoading(false)
      }
    }

    fetchFoundItem()
  }, [id, navigate])

  const handleBackClick = () => {
    if (window.history.state && window.history.state.idx > 0) {
      navigate(-1)
    } else {
      navigate("/found")
    }
  }

  const handleContactFinder = () => {
    if (item?.finder?.phone) {
      window.open(`tel:${item.finder.phone}`, "_self")
    }
  }

  const handleEmailFinder = () => {
    if (item?.finder?.email) {
      window.open(`mailto:${item.finder.email}`, "_self")
    }
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Found: ${item?.name}`,
          text: `I found this item: ${item?.name}. Contact me to claim it!`,
          url: window.location.href,
        })
      } catch (err) {
        // User cancelled share
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href)
      toast.success("Link copied to clipboard!")
    }
  }

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

      <div className="relative z-10 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6 sm:mb-8 bg-white/90 backdrop-blur-lg border border-violet-200/50 p-4 sm:p-6 rounded-2xl shadow-xl">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center space-x-4">
              <button
                onClick={handleBackClick}
                className="flex items-center px-3 sm:px-4 py-2 bg-white/60 hover:bg-white/80 border border-violet-200/60 text-gray-700 hover:text-gray-900 font-medium rounded-lg sm:rounded-xl transition-all duration-300 transform hover:scale-[1.02] active:scale-95"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </button>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-violet-600 to-blue-600 rounded-lg flex items-center justify-center shadow-lg">
                  <HelpCircle className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-lg sm:text-2xl font-bold text-gray-900">Found Item Details</h1>
                  <p className="text-gray-600 text-sm">Lost & Found Center</p>
                </div>
              </div>
            </div>
            <div className="flex space-x-2 sm:space-x-3">
              <button
                onClick={() => setIsFavorited(!isFavorited)}
                className={`p-2 sm:p-3 rounded-lg sm:rounded-xl transition-all duration-300 transform hover:scale-[1.02] active:scale-95 ${
                  isFavorited
                    ? "bg-red-50 border border-red-200 text-red-600"
                    : "bg-white/60 hover:bg-white/80 border border-violet-200/60 text-gray-700 hover:text-gray-900"
                }`}
              >
                <Heart className={`w-4 h-4 sm:w-5 sm:h-5 ${isFavorited ? "fill-current" : ""}`} />
              </button>
              <button 
                onClick={handleShare}
                className="p-2 sm:p-3 bg-white/60 hover:bg-white/80 border border-violet-200/60 text-gray-700 hover:text-gray-900 rounded-lg sm:rounded-xl transition-all duration-300 transform hover:scale-[1.02] active:scale-95"
              >
                <Share2 className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-white/90 backdrop-blur-lg border border-violet-200/50 rounded-2xl shadow-xl overflow-hidden">
          {loading && (
            <div className="flex items-center justify-center py-16 sm:py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-violet-500"></div>
              <p className="text-gray-600 ml-4">Loading item details...</p>
            </div>
          )}

          {error && (
            <div className="p-6 sm:p-8">
              <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Package className="w-8 h-8 text-red-500" />
                </div>
                <p className="text-red-600 text-lg font-medium mb-2">Error Loading Item</p>
                <p className="text-gray-600">{error}</p>
              </div>
            </div>
          )}

          {item && (
            <div className="p-4 sm:p-6 lg:p-8">
              <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
                {/* LEFT: Image Gallery */}
                <div className="space-y-4 sm:space-y-6">
                  {/* Main Image */}
                  <div className="relative overflow-hidden rounded-xl sm:rounded-2xl bg-white/60 border border-violet-200/50 shadow-lg">
                    <img
                      src={selectedImage || "/placeholder.svg"}
                      alt="Selected item"
                      className="w-full h-64 sm:h-80 lg:h-96 xl:h-[500px] object-cover"
                    />
                    <div className="absolute top-3 sm:top-4 right-3 sm:right-4">
                      <div className="px-2 sm:px-3 py-1 bg-green-500/90 backdrop-blur-sm text-green-50 text-xs sm:text-sm font-medium rounded-full border border-green-400/50">
                        Found
                      </div>
                    </div>
                    <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4">
                      <div className="px-2 sm:px-3 py-1 bg-white/90 backdrop-blur-sm text-gray-800 text-xs sm:text-sm font-medium rounded-full border border-white/50">
                        <Eye className="w-3 h-3 sm:w-4 sm:h-4 inline mr-1" />
                        Detailed View
                      </div>
                    </div>
                  </div>

                  {/* Thumbnail Gallery */}
                  {item.imageUrls && item.imageUrls.length > 1 && (
                    <div className="flex gap-2 sm:gap-3 overflow-x-auto pb-2">
                      {item.imageUrls.map((url, index) => (
                        <button
                          key={index}
                          onClick={() => setSelectedImage(url)}
                          className={`flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-lg sm:rounded-xl overflow-hidden border-2 transition-all duration-300 ${
                            selectedImage === url
                              ? "border-violet-500 shadow-lg shadow-violet-500/20"
                              : "border-violet-200/50 hover:border-violet-300"
                          }`}
                        >
                          <img
                            src={url || "/placeholder.svg"}
                            alt={`Thumbnail ${index + 1}`}
                            className="w-full h-full object-cover"
                          />
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* RIGHT: Item Information */}
                <div className="space-y-6 sm:space-y-8">
                  {/* Item Title & Category */}
                  <div>
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mb-4">
                      <span className="px-3 py-1 bg-violet-100 text-violet-700 text-sm font-medium rounded-full border border-violet-200">
                        {item.category}
                      </span>
                      <div className="flex items-center text-gray-500 text-sm">
                        <MapPin className="w-4 h-4 mr-1" />
                        <span>Found Item Details</span>
                      </div>
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">{item.name}</h2>
                    <p className="text-gray-700 text-base sm:text-lg leading-relaxed">{item.description}</p>
                  </div>

                  {/* Status Information */}
                  <div className="bg-gradient-to-br from-green-50/80 to-emerald-50/80 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-green-200/50 shadow-lg">
                    <div className="flex items-center space-x-2 mb-3">
                      <Package className="w-5 h-5 text-green-600" />
                      <span className="text-gray-700 font-semibold">Item Status</span>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                      <span className="text-green-700 font-bold text-xl sm:text-2xl">Available for Claim</span>
                      <span className="px-3 py-1 bg-green-100 text-green-700 text-sm font-medium rounded-full border border-green-200 self-start sm:self-center">
                        🔍 Found Item
                      </span>
                    </div>
                    <p className="text-green-600 text-sm mt-2">Contact the finder to claim this item</p>
                  </div>

                  {/* Finder Information */}
                  {item.finder && (
                    <div className="bg-gradient-to-br from-violet-50/80 to-blue-50/80 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-violet-200/50 shadow-lg">
                      <div className="flex items-center space-x-2 mb-4">
                        <User className="w-5 h-5 text-violet-600" />
                        <span className="text-gray-900 font-semibold text-lg">Finder Information</span>
                      </div>
                      <div className="space-y-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-violet-600 to-blue-600 rounded-full flex items-center justify-center shadow-lg">
                            <User className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                          </div>
                          <div>
                            <p className="text-gray-900 font-semibold text-base sm:text-lg">{item.finder.name}</p>
                            <p className="text-gray-600 text-sm flex items-center">
                              <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                              Verified Finder
                            </p>
                          </div>
                        </div>
                        <div className="space-y-3">
                          <div className="flex items-center space-x-3 p-3 bg-white/60 backdrop-blur-sm rounded-lg border border-violet-200/30">
                            <Mail className="w-4 h-4 text-gray-500" />
                            <span className="text-gray-700 text-sm sm:text-base">{item.finder.email}</span>
                          </div>
                          {item.finder.phone && (
                            <div className="flex items-center space-x-3 p-3 bg-white/60 backdrop-blur-sm rounded-lg border border-violet-200/30">
                              <Phone className="w-4 h-4 text-gray-500" />
                              <span className="text-gray-700 text-sm sm:text-base">{item.finder.phone}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Item Details */}
                  <div className="bg-white/60 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-gray-200/50 shadow-lg">
                    <h3 className="text-gray-900 font-semibold text-lg mb-4 flex items-center">
                      <Package className="w-5 h-5 text-gray-600 mr-2" />
                      Item Details
                    </h3>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center py-2 border-b border-gray-200/50">
                        <span className="text-gray-600">Category:</span>
                        <span className="font-medium text-gray-900">{item.category}</span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b border-gray-200/50">
                        <span className="text-gray-600">Status:</span>
                        <span className="font-medium text-green-600">Available</span>
                      </div>
                      {item.createdAt && (
                        <div className="flex justify-between items-center py-2">
                          <span className="text-gray-600">Date Found:</span>
                          <span className="font-medium text-gray-900 flex items-center">
                            <Calendar className="w-4 h-4 mr-1" />
                            {new Date(item.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="space-y-3 sm:space-y-4">
                    <button
                      onClick={handleContactFinder}
                      className="w-full flex items-center justify-center px-6 py-3 sm:py-4 bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-700 hover:to-blue-700 text-white font-semibold text-sm sm:text-base rounded-xl transition-all duration-300 shadow-lg hover:shadow-violet-500/20 transform hover:scale-[1.02] active:scale-95 group"
                    >
                      <Phone className="w-4 h-4 sm:w-5 sm:h-5 mr-3 group-hover:rotate-12 transition-transform duration-200" />
                      Contact Finder
                    </button>

                    <button
                      onClick={handleEmailFinder}
                      className="w-full flex items-center justify-center px-6 py-3 sm:py-4 bg-white/60 hover:bg-white/80 border border-violet-200/60 text-gray-700 hover:text-gray-900 font-medium text-sm sm:text-base rounded-xl transition-all duration-300 transform hover:scale-[1.02] active:scale-95 group"
                    >
                      <Mail className="w-4 h-4 sm:w-5 sm:h-5 mr-3 group-hover:translate-x-1 transition-transform duration-200" />
                      Send Email
                    </button>

                    <div className="pt-4 border-t border-gray-200/50">
                      <div className="text-center">
                        <div className="text-2xl mb-2">🤝</div>
                        <h4 className="font-semibold text-gray-700 mb-1">Help Reunite Items</h4>
                        <p className="text-sm text-gray-600">Contact the finder to claim this item and say thank you!</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
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
  )
}
