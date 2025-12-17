"use client"

import { useEffect, useState, useRef } from "react"
import axios from "axios"
import config from "../../config"
import { useNavigate } from "react-router-dom"
import toast from "react-hot-toast"
import { Search, Filter, HelpCircle, Package, Eye, User, Upload, ShoppingBag, MapPin, Menu, X, ChevronLeft, ChevronRight } from "lucide-react"

const categories = ["Books", "Electronics", "Stationery", "Clothing", "Others"]

// Sidebar Component
function Sidebar({ sidebarOpen, setSidebarOpen, navigate, itemsCount }) {
  return (
    <>
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/20 z-40 lg:hidden backdrop-blur-sm" onClick={() => setSidebarOpen(false)}></div>
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
              <div className="flex items-center space-x-3 cursor-pointer" onClick={() => navigate("/")}>
                <div className="w-12 h-12 bg-gradient-to-br from-violet-600 to-blue-600 rounded-lg flex items-center justify-center shadow-lg">
                  <ShoppingBag className="w-6 h-6 text-white" />
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-violet-600 to-blue-600 bg-clip-text text-transparent tracking-tight">
                  WALCHAND MART
                </span>
              </div>
              <button
                onClick={() => setSidebarOpen(false)}
                className="lg:hidden p-2 hover:bg-violet-100/50 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>
            <p className="text-gray-600 text-sm">Lost & Found Dashboard</p>
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
              className="flex items-center w-full text-left px-4 py-3 bg-gradient-to-r from-violet-600 to-blue-600 text-white font-medium rounded-xl shadow-lg hover:shadow-violet-500/20 transition-all duration-300 transform hover:scale-[1.02] active:scale-95"
            >
              <HelpCircle className="w-5 h-5 mr-3" />
              Lost Something?
            </button>
            <button
              onClick={() => navigate("/found/upload")}
              className="flex items-center w-full text-left px-4 py-3 bg-white/60 hover:bg-white/80 border border-violet-200/60 text-gray-700 hover:text-gray-900 font-medium rounded-xl transition-all duration-300 transform hover:scale-[1.02] active:scale-95"
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

          {/* Quick Stats */}
          <div className="p-4 bg-gradient-to-br from-violet-100/80 to-blue-100/80 backdrop-blur-sm rounded-xl border border-violet-200/50 shadow-lg">
            <h3 className="text-violet-700 font-semibold mb-3 flex items-center">
              <MapPin className="w-4 h-4 mr-2" />
              Lost & Found Stats
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600 text-sm">Items Found:</span>
                <span className="text-violet-600 font-semibold bg-violet-50 px-2 py-1 rounded-full text-sm">{itemsCount}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600 text-sm">Status:</span>
                <span className="text-green-600 font-semibold bg-green-50 px-2 py-1 rounded-full text-sm flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-1 animate-pulse"></div>
                  Active
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600 text-sm">Recovery:</span>
                <span className="text-blue-600 font-semibold bg-blue-50 px-2 py-1 rounded-full text-sm">📍 Campus</span>
              </div>
            </div>
          </div>

          {/* Help Section */}
          <div className="mt-6 p-3 bg-white/60 backdrop-blur-sm border border-violet-200/40 rounded-lg text-center">
            <div className="text-2xl mb-2">🔍</div>
            <div className="text-xs font-semibold text-gray-700">Lost & Found Hub</div>
            <div className="text-xs text-gray-600">Reuniting belongings</div>
          </div>
        </div>
      </div>
    </>
  )
}

// Pagination Component
function Pagination({ currentPage, totalPages, onPageChange }) {
  const getVisiblePages = () => {
    const delta = 2
    const range = []
    const rangeWithDots = []
    
    for (let i = Math.max(2, currentPage - delta); i <= Math.min(totalPages - 1, currentPage + delta); i++) {
      range.push(i)
    }

    if (currentPage - delta > 2) {
      rangeWithDots.push(1, '...')
    } else {
      rangeWithDots.push(1)
    }

    rangeWithDots.push(...range)

    if (currentPage + delta < totalPages - 1) {
      rangeWithDots.push('...', totalPages)
    } else {
      rangeWithDots.push(totalPages)
    }

    return rangeWithDots
  }

  if (totalPages <= 1) return null

  return (
    <div className="flex items-center justify-center space-x-2 mt-8">
      <button
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        className="flex items-center px-3 py-2 bg-white/80 hover:bg-white border border-violet-200/60 hover:border-violet-300 text-gray-700 hover:text-gray-900 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed backdrop-blur-sm"
      >
        <ChevronLeft className="w-4 h-4" />
      </button>

      {getVisiblePages().map((page, index) => (
        <div key={index}>
          {page === '...' ? (
            <span className="px-3 py-2 text-gray-500">...</span>
          ) : (
            <button
              onClick={() => onPageChange(page)}
              className={`px-3 py-2 rounded-lg font-medium transition-all duration-200 backdrop-blur-sm ${
                currentPage === page
                  ? 'bg-gradient-to-r from-violet-600 to-blue-600 text-white shadow-lg'
                  : 'bg-white/80 hover:bg-white border border-violet-200/60 hover:border-violet-300 text-gray-700 hover:text-gray-900'
              }`}
            >
              {page}
            </button>
          )}
        </div>
      ))}

      <button
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        className="flex items-center px-3 py-2 bg-white/80 hover:bg-white border border-violet-200/60 hover:border-violet-300 text-gray-700 hover:text-gray-900 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed backdrop-blur-sm"
      >
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  )
}

// Main Found Component
export default function Found() {
  const [allItems, setAllItems] = useState([])
  const [displayedItems, setDisplayedItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [category, setCategory] = useState("")
  const [searchQuery, setSearchQuery] = useState("")
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(9) // 3x3 grid
  const debounceRef = useRef(null)
  const navigate = useNavigate()

  // Pagination logic
  useEffect(() => {
    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    setDisplayedItems(allItems.slice(startIndex, endIndex))
  }, [allItems, currentPage, itemsPerPage])

  const totalPages = Math.ceil(allItems.length / itemsPerPage)

  const handlePageChange = (page) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const checkAuthAndFetch = async (apiCall) => {
    const token = localStorage.getItem("token")
    if (!token) {
      toast.error("Authorization token missing or invalid")
      navigate("/")
      return null
    }

    try {
      const response = await apiCall(token)
      return response
    } catch (err) {
      if (err.response?.status === 401) {
        localStorage.removeItem("token")
        const errorMsg = err.response?.data?.msg || "Invalid or expired token"
        toast.error(errorMsg)
        navigate("/")
        return null
      }
      throw err
    }
  }

  const fetchAllItems = async () => {
    setLoading(true)
    try {
      const response = await checkAuthAndFetch((token) =>
        axios.get(`${config.BASE_URL}${config.GET_ALL_FOUND}`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
      )
      if (response) {
        setAllItems(Array.isArray(response.data.data) ? response.data.data : [])
        setCurrentPage(1)
        setError("")
      }
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong")
      toast.error(err.response?.data?.message || "Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  const handleCategoryFilter = async (selectedCategory) => {
    setCategory(selectedCategory)
    if (!selectedCategory) {
      fetchAllItems()
      return
    }

    setLoading(true)
    try {
      const response = await checkAuthAndFetch((token) =>
        axios.post(
          `${config.BASE_URL}${config.GET_FOUND_BY_CATEGORY}`,
          { category: selectedCategory },
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        ),
      )
      if (response) {
        setAllItems(Array.isArray(response.data) ? response.data : [])
        setCurrentPage(1)
        setError("")
      }
    } catch (err) {
      setError(err.response?.data?.message || "Filter failed")
      toast.error(err.response?.data?.message || "Filter failed")
    } finally {
      setLoading(false)
    }
  }

  const handleLiveSearch = async (query) => {
    if (!query.trim()) {
      if (category) handleCategoryFilter(category)
      else fetchAllItems()
      return
    }

    setLoading(true)
    try {
      const response = await checkAuthAndFetch((token) =>
        axios.post(
          `${config.BASE_URL}${config.GET_FOUND_BY_SEARCH}`,
          { query },
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        ),
      )
      if (response) {
        setAllItems(Array.isArray(response.data.data) ? response.data.data : [])
        setCurrentPage(1)
        setError("")
      }
    } catch (err) {
      setError(err.response?.data?.message || "Search failed")
      toast.error(err.response?.data?.message || "Search failed")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (!token) {
      toast.error("Authorization token missing or invalid")
      navigate("/")
      return
    }
    fetchAllItems()
  }, [navigate])

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(() => {
      handleLiveSearch(searchQuery)
    }, 1000)
    return () => clearTimeout(debounceRef.current)
  }, [searchQuery])

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
          itemsCount={allItems.length} 
        />

        {/* Main content */}
        <div className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto max-h-screen">
          {/* Header */}
          <div className="mb-8 bg-white/90 backdrop-blur-lg border border-violet-200/50 p-6 rounded-2xl shadow-xl">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setSidebarOpen(true)}
                  className="lg:hidden p-2 hover:bg-violet-100/50 rounded-lg transition-colors"
                >
                  <Menu className="w-5 h-5 text-gray-600" />
                </button>
                <div>
                  <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Lost & Found Center</h1>
                  <p className="text-gray-600 text-sm sm:text-base">Help reunite students with their belongings</p>
                </div>
              </div>
              <button
                onClick={() => navigate("/account")}
                className="p-3 bg-gradient-to-br from-violet-600 to-blue-600 hover:from-violet-700 hover:to-blue-700 rounded-xl transition-all duration-300 shadow-lg hover:shadow-violet-500/20 transform hover:scale-[1.02] active:scale-95"
                title="Go to Profile"
              >
                <User className="w-6 h-6 text-white" />
              </button>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="mb-8 bg-white/90 backdrop-blur-lg border border-violet-200/50 p-6 rounded-2xl shadow-xl">
            <div className="flex flex-col lg:flex-row gap-4 items-center">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by item name..."
                  className="w-full pl-10 pr-4 py-3 bg-white/80 border border-violet-200/60 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all duration-300"
                />
              </div>
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <select
                  value={category}
                  onChange={(e) => handleCategoryFilter(e.target.value)}
                  className="pl-10 pr-8 py-3 bg-white/80 border border-violet-200/60 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all duration-300 appearance-none cursor-pointer"
                >
                  <option value="">All Categories</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Items List */}
          <div className="bg-white/90 backdrop-blur-lg border border-violet-200/50 p-6 sm:p-8 rounded-2xl shadow-xl">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <MapPin className="w-6 h-6 text-violet-500 mr-3" />
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Found Items</h2>
              </div>
              {!loading && (
                <div className="text-right">
                  <span className="text-gray-500 text-sm">{allItems.length} items found</span>
                  {totalPages > 1 && (
                    <div className="text-xs text-gray-400 mt-1">
                      Page {currentPage} of {totalPages}
                    </div>
                  )}
                </div>
              )}
            </div>

            {loading && (
              <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-violet-500"></div>
                <p className="text-gray-600 ml-4">Loading items...</p>
              </div>
            )}

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6">
                <p className="text-red-600">{error}</p>
              </div>
            )}

            {!loading && !error && Array.isArray(allItems) && allItems.length === 0 && (
              <div className="text-center py-12">
                <HelpCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 text-lg font-medium">No items found</p>
                <p className="text-gray-500 text-sm">Try adjusting your search or check back later</p>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {displayedItems.map((item) => (
                <div
                  key={item._id}
                  className="bg-white/80 backdrop-blur-sm border border-violet-200/50 rounded-xl overflow-hidden transition-all duration-300 hover:border-violet-300 hover:shadow-xl hover:shadow-violet-500/10 transform hover:scale-[1.02] group"
                >
                  {item.imageUrls?.[0] && (
                    <div className="relative overflow-hidden">
                      <img
                        src={item.imageUrls[0] || "/placeholder.svg"}
                        alt={item.name}
                        className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <div className="absolute top-3 right-3">
                        <div className="px-2 py-1 bg-green-500/90 backdrop-blur-sm text-green-50 text-xs font-medium rounded-full border border-green-400/50">
                          Found
                        </div>
                      </div>
                    </div>
                  )}
                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-1">{item.name}</h3>
                    <p className="text-gray-600 mb-3 line-clamp-2 text-sm">{item.description}</p>

                    <div className="flex items-center justify-between mb-4">
                      <span className="px-3 py-1 bg-violet-100 text-violet-700 text-xs font-medium rounded-full border border-violet-200">
                        {item.category}
                      </span>
                    </div>

                    {item.finder && (
                      <div className="mb-4 p-3 bg-gray-50 rounded-lg border border-gray-200">
                        <p className="text-gray-700 text-sm">
                          <span className="text-gray-500">Found by:</span> {item.finder.name}
                        </p>
                        <p className="text-gray-500 text-xs">{item.finder.email}</p>
                      </div>
                    )}

                    <button
                      onClick={() => navigate("/found/details", { state: { id: item._id } })}
                      className="w-full flex items-center justify-center px-4 py-3 bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-700 hover:to-blue-700 text-white font-medium rounded-xl transition-all duration-300 shadow-lg hover:shadow-violet-500/20 transform hover:scale-[1.02] active:scale-95 group"
                    >
                      <Eye className="w-4 h-4 mr-2 group-hover:translate-x-1 transition-transform duration-200" />
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <Pagination 
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        </div>
      </div>

      {/* Styles */}
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
        
        @media (prefers-reduced-motion: reduce) {
          .animate-pulse {
            animation: none;
          }
        }
      `}</style>
    </div>
  )
}
