import React, { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { toast } from 'react-hot-toast'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const handleLogout = async () => {
    try {
      await logout()
      toast.success('Logged out successfully')
      navigate('/')
    } catch (error) {
      toast.error('Failed to logout')
    }
  }

  const isActive = (path) => location.pathname === path

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-900/95 backdrop-blur-xl border-b border-gray-800/50 shadow-2xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-cyan-500/25 transition-all duration-300 group-hover:scale-105">
                <span className="text-white font-bold text-lg">E</span>
              </div>
              <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 rounded-xl blur opacity-20 group-hover:opacity-40 transition-opacity duration-300"></div>
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent group-hover:from-cyan-300 group-hover:via-blue-300 group-hover:to-purple-300 transition-all duration-300">
              EceraSystems
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className={`relative px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 group ${
                isActive('/') 
                  ? 'text-cyan-400 bg-cyan-500/10 shadow-lg shadow-cyan-500/20' 
                  : 'text-gray-300 hover:text-white hover:bg-gray-800/50'
              }`}
            >
              <span className="relative z-10">Home</span>
              {isActive('/') && (
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-xl"></div>
              )}
            </Link>
            
            {user ? (
              <>
                <Link
                  to="/dashboard"
                  className={`relative px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 group ${
                    isActive('/dashboard') 
                      ? 'text-cyan-400 bg-cyan-500/10 shadow-lg shadow-cyan-500/20' 
                      : 'text-gray-300 hover:text-white hover:bg-gray-800/50'
                  }`}
                >
                  <span className="relative z-10">Dashboard</span>
                  {isActive('/dashboard') && (
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-xl"></div>
                  )}
                </Link>
                <div className="flex items-center space-x-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs font-bold">
                        {user.email.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <span className="text-sm text-gray-300">
                      {user.email}
                    </span>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="relative px-5 py-2.5 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-xl text-sm font-medium hover:from-red-500 hover:to-red-600 transition-all duration-300 shadow-lg hover:shadow-red-500/25 group overflow-hidden"
                  >
                    <span className="relative z-10">Logout</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-red-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </button>
                </div>
              </>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  to="/login"
                  className={`relative px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ${
                    isActive('/login') 
                      ? 'text-cyan-400 bg-cyan-500/10 shadow-lg shadow-cyan-500/20' 
                      : 'text-gray-300 hover:text-white hover:bg-gray-800/50'
                  }`}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="relative px-5 py-2.5 bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-600 text-white rounded-xl text-sm font-medium hover:from-cyan-500 hover:via-blue-500 hover:to-purple-500 transition-all duration-300 shadow-lg hover:shadow-cyan-500/25 group overflow-hidden"
                >
                  <span className="relative z-10">Register</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-xl text-gray-300 hover:text-white hover:bg-gray-800/50 transition-all duration-300"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-4 pt-4 pb-6 space-y-3 bg-gray-800/50 backdrop-blur-xl rounded-2xl mt-4 border border-gray-700/50 shadow-2xl">
              <Link
                to="/"
                className={`block px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${
                  isActive('/') 
                    ? 'text-cyan-400 bg-cyan-500/10 shadow-lg shadow-cyan-500/20' 
                    : 'text-gray-300 hover:text-white hover:bg-gray-700/50'
                }`}
                onClick={() => setIsOpen(false)}
              >
                Home
              </Link>
              
              {user ? (
                <>
                  <Link
                    to="/dashboard"
                    className={`block px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${
                      isActive('/dashboard') 
                        ? 'text-cyan-400 bg-cyan-500/10 shadow-lg shadow-cyan-500/20' 
                        : 'text-gray-300 hover:text-white hover:bg-gray-700/50'
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <div className="px-4 py-3 border-t border-gray-700/50 mt-4">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="w-8 h-8 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-xs font-bold">
                          {user.email.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <span className="text-sm text-gray-300">
                        {user.email}
                      </span>
                    </div>
                    <button
                      onClick={() => {
                        handleLogout()
                        setIsOpen(false)
                      }}
                      className="w-full px-4 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-xl text-sm font-medium hover:from-red-500 hover:to-red-600 transition-all duration-300 shadow-lg"
                    >
                      Logout
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className={`block px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${
                      isActive('/login') 
                        ? 'text-cyan-400 bg-cyan-500/10 shadow-lg shadow-cyan-500/20' 
                        : 'text-gray-300 hover:text-white hover:bg-gray-700/50'
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="block px-4 py-3 mx-2 bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-600 text-white rounded-xl text-sm font-medium hover:from-cyan-500 hover:via-blue-500 hover:to-purple-500 transition-all duration-300 text-center shadow-lg"
                    onClick={() => setIsOpen(false)}
                  >
                    Register
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar
