import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import toast from 'react-hot-toast'
import { Lightbulb, User, Mail, Lock, Eye, EyeOff, ArrowRight, Sparkles, Star } from 'lucide-react'

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [focusedField, setFocusedField] = useState('')
  
  const { register } = useAuth()
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      await register(formData.name, formData.email, formData.password)
      toast.success('Account created successfully!')
      navigate('/login')
    } catch (error) {
      toast.error(error.response?.data?.message || 'Registration failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4 relative">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-900 opacity-50"></div>
      
      {/* Grid pattern overlay */}
      <div className="absolute inset-0" style={{
        backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.05) 1px, transparent 0)`,
        backgroundSize: '50px 50px'
      }}></div>

      <div className="relative z-10 max-w-md w-full">
        {/* Logo Section */}
        <div className="text-center mb-12">
          <Link to="/" className="inline-flex items-center space-x-3 group">
            <div className="relative">
              <div className="w-14 h-14 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg shadow-yellow-500/25">
                <Lightbulb className="w-8 h-8 text-black" />
              </div>
            </div>
            <span className="text-4xl font-bold bg-gradient-to-r from-white via-gray-100 to-yellow-400 bg-clip-text text-transparent">
              IdeaTracker
            </span>
          </Link>
          <div className="flex items-center justify-center space-x-2 mt-6">
            <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
            <p className="text-gray-400 font-medium text-sm">Create your account and start tracking ideas</p>
            <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
          </div>
        </div>

        {/* Form Container */}
        <div className="relative">
          <div className="bg-gray-900/80 backdrop-blur-xl rounded-3xl p-8 border border-gray-800 shadow-2xl shadow-black/50">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Field */}
              <div className="relative">
                <label 
                  htmlFor="name" 
                  className={`absolute left-4 transition-all duration-200 pointer-events-none z-10 ${
                    focusedField === 'name' || formData.name 
                      ? '-top-3 text-sm bg-gray-900 px-2 text-yellow-400 font-medium' 
                      : 'top-4 text-gray-500 ml-8'
                  }`}
                >
                  Full Name
                </label>
                <div className="relative">
                  <User className={`absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 transition-colors duration-200 ${
                    focusedField === 'name' ? 'text-yellow-400' : 'text-gray-500'
                  }`} />
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('name')}
                    onBlur={() => setFocusedField('')}
                    className="w-full pl-12 pr-4 py-4 bg-black/50 border border-gray-700 rounded-xl text-white placeholder-transparent focus:outline-none focus:ring-2 focus:ring-yellow-400/50 focus:border-yellow-400 transition-all duration-200 hover:border-gray-600"
                    placeholder="Enter your full name"
                    required
                  />
                </div>
              </div>

              {/* Email Field */}
              <div className="relative">
                <label 
                  htmlFor="email" 
                  className={`absolute left-4 transition-all duration-200 pointer-events-none z-10 ${
                    focusedField === 'email' || formData.email 
                      ? '-top-3 text-sm bg-gray-900 px-2 text-yellow-400 font-medium' 
                      : 'top-4 text-gray-500 ml-8'
                  }`}
                >
                  Email Address
                </label>
                <div className="relative">
                  <Mail className={`absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 transition-colors duration-200 ${
                    focusedField === 'email' ? 'text-yellow-400' : 'text-gray-500'
                  }`} />
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('email')}
                    onBlur={() => setFocusedField('')}
                    className="w-full pl-12 pr-4 py-4 bg-black/50 border border-gray-700 rounded-xl text-white placeholder-transparent focus:outline-none focus:ring-2 focus:ring-yellow-400/50 focus:border-yellow-400 transition-all duration-200 hover:border-gray-600"
                    placeholder="Enter your email"
                    required
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="relative">
                <label 
                  htmlFor="password" 
                  className={`absolute left-4 transition-all duration-200 pointer-events-none z-10 ${
                    focusedField === 'password' || formData.password 
                      ? '-top-3 text-sm bg-gray-900 px-2 text-yellow-400 font-medium' 
                      : 'top-4 text-gray-500 ml-8'
                  }`}
                >
                  Password
                </label>
                <div className="relative">
                  <Lock className={`absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 transition-colors duration-200 ${
                    focusedField === 'password' ? 'text-yellow-400' : 'text-gray-500'
                  }`} />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('password')}
                    onBlur={() => setFocusedField('')}
                    className="w-full pl-12 pr-12 py-4 bg-black/50 border border-gray-700 rounded-xl text-white placeholder-transparent focus:outline-none focus:ring-2 focus:ring-yellow-400/50 focus:border-yellow-400 transition-all duration-200 hover:border-gray-600"
                    placeholder="Create a password (min 6 characters)"
                    required
                    minLength={6}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-yellow-400 transition-colors duration-200 focus:outline-none"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                <p className="text-xs text-gray-500 mt-2 ml-1">Password must be at least 6 characters long</p>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="relative w-full bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-black font-bold py-4 px-6 rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-yellow-500/25 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] disabled:hover:scale-100"
              >
                <span className="flex items-center justify-center space-x-2">
                  {loading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin"></div>
                      <span>Creating Account...</span>
                    </>
                  ) : (
                    <>
                      <span>Create Account</span>
                      <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                    </>
                  )}
                </span>
              </button>
            </form>

            {/* Login Link */}
            <div className="mt-8 text-center">
              <p className="text-gray-400 text-sm">
                Already have an account?{' '}
                <Link 
                  to="/login" 
                  className="font-semibold text-yellow-400 hover:text-yellow-300 transition-colors duration-200 underline decoration-transparent hover:decoration-yellow-400 underline-offset-4"
                >
                  Sign In
                </Link>
              </p>
            </div>
          </div>
        </div>

        {/* Bottom accent */}
        <div className="flex justify-center mt-8">
          <div className="flex space-x-2">
            <div className="w-2 h-2 bg-gray-700 rounded-full"></div>
            <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
            <div className="w-2 h-2 bg-gray-700 rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register;