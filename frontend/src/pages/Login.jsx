import React, { useState } from 'react'
import { Lightbulb, Mail, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import toast from 'react-hot-toast'

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [focusedField, setFocusedField] = useState('')
    const navigate = useNavigate()
    const { login } = useAuth()

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
      await login(formData.email, formData.password)
      toast.success('Welcome back!')
      navigate('/dashboard')
    } catch (error) {
      toast.error(error.response?.data?.message || 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  const handleNavigation = () => {
    navigate('/register')
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4 relative">
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900/20 via-transparent to-gray-800/20 pointer-events-none"></div>
      
      {/* Grid pattern overlay */}
      <div className="absolute inset-0 opacity-5">
        <div className="w-full h-full" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }}></div>
      </div>

      <div className="relative z-10 max-w-md w-full">
        {/* Logo Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-4 group cursor-pointer">
            <div className="relative">
              <div className="w-16 h-16 bg-gradient-to-tr from-amber-400 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg shadow-amber-500/20">
                <Lightbulb className="w-8 h-8 text-white" />
              </div>
            </div>
            <span className="text-5xl font-black bg-gradient-to-r from-white via-gray-200 to-gray-300 bg-clip-text text-transparent">
              IdeaTracker
            </span>
          </div>
          <div className="mt-6">
            <p className="text-gray-400 text-lg font-medium">Welcome back</p>
            <p className="text-gray-500 text-sm">Please sign in to your account</p>
          </div>
        </div>

        {/* Form Container */}
        <div className="relative">
          {/* Card with subtle border */}
          <div className="bg-gray-900/40 backdrop-blur-xl rounded-3xl p-8 border border-gray-800/50 shadow-2xl">
            <div className="space-y-6">
              {/* Email Field */}
              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-semibold text-gray-300 ml-1">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('email')}
                    onBlur={() => setFocusedField('')}
                    className="w-full pl-12 pr-4 py-4 bg-gray-800/50 border border-gray-700/50 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500/50 transition-all duration-200 hover:border-gray-600/50"
                    placeholder="Enter your email address"
                    required
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <label htmlFor="password" className="block text-sm font-semibold text-gray-300 ml-1">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('password')}
                    onBlur={() => setFocusedField('')}
                    className="w-full pl-12 pr-12 py-4 bg-gray-800/50 border border-gray-700/50 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500/50 transition-all duration-200 hover:border-gray-600/50"
                    placeholder="Enter your password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors duration-200 focus:outline-none"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={loading}
                  onClick={handleSubmit}
                  className="w-full bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white font-bold py-4 px-6 rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-amber-500/25 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-amber-500/50"
                >
                  <span className="flex items-center justify-center space-x-2">
                    {loading ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                        <span>Signing In...</span>
                      </>
                    ) : (
                      <>
                        <span>Sign In</span>
                        <ArrowRight className="w-5 h-5" />
                      </>
                    )}
                  </span>
                </button>
              </div>
            </div>

            {/* Register Link */}
            <div className="mt-8 text-center">
              <p className="text-gray-400">
                Don't have an account?{' '}
                <span onClick={handleNavigation} className="font-semibold text-amber-400 hover:text-amber-300 transition-colors duration-200 cursor-pointer">
                  Create Account
                </span>
              </p>
            </div>
          </div>
        </div>

        {/* Bottom accent */}
        <div className="mt-8 text-center">
          <div className="inline-flex items-center space-x-1 text-gray-600">
            <div className="w-1 h-1 bg-gray-600 rounded-full"></div>
            <div className="w-1 h-1 bg-gray-600 rounded-full"></div>
            <div className="w-1 h-1 bg-gray-600 rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login;