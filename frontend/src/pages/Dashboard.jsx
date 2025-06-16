import React, { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import toast from 'react-hot-toast'
import api from '../services/api'
import { 
  Plus, 
  LogOut, 
  Search, 
  Filter, 
  Edit2, 
  Trash2, 
  Eye,
  Lightbulb,
  TrendingUp,
  Target,
  DollarSign,
  Clock,
  Tag,
  Sparkles
} from 'lucide-react'
import IdeaForm from '../components/IdeaForm'
import IdeaCard from '../components/IdeaCard'

const Dashboard = () => {
  const { user, logout } = useAuth()
  const [ideas, setIdeas] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingIdea, setEditingIdea] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')

  useEffect(() => {
    fetchIdeas()
  }, [])

  const fetchIdeas = async () => {
    try {
      const response = await api.get('/ideas')
      setIdeas(response.data)
    } catch (error) {
      toast.error('Failed to fetch ideas')
    } finally {
      setLoading(false)
    }
  }

  const handleCreateIdea = async (ideaData) => {
    try {
      const response = await api.post('/ideas', ideaData)
      setIdeas([response.data, ...ideas])
      setShowForm(false)
      toast.success('Idea created successfully!')
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to create idea')
    }
  }

  const handleUpdateIdea = async (ideaData) => {
    try {
      const response = await api.put(`/ideas/${editingIdea._id}`, ideaData)
      setIdeas(ideas.map(idea => 
        idea._id === editingIdea._id ? response.data : idea
      ))
      setEditingIdea(null)
      setShowForm(false)
      toast.success('Idea updated successfully!')
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update idea')
    }
  }

  const handleDeleteIdea = async (ideaId) => {
    if (!window.confirm('Are you sure you want to delete this idea?')) return
    
    try {
      await api.delete(`/ideas/${ideaId}`)
      setIdeas(ideas.filter(idea => idea._id !== ideaId))
      toast.success('Idea deleted successfully!')
    } catch (error) {
      toast.error('Failed to delete idea')
    }
  }

  const handleEdit = (idea) => {
    setEditingIdea(idea)
    setShowForm(true)
  }

  const filteredIdeas = ideas.filter(idea => {
    const matchesSearch = idea.ideaName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         idea.targetAudience.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         idea.category.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesFilter = filterStatus === 'all' || idea.status === filterStatus
    
    return matchesSearch && matchesFilter
  })

  const getStatusColor = (status) => {
    const colors = {
      'Idea': 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-500/25',
      'Research': 'bg-gradient-to-r from-yellow-500 to-amber-500 text-white shadow-lg shadow-yellow-500/25',
      'Planning': 'bg-gradient-to-r from-purple-500 to-violet-600 text-white shadow-lg shadow-purple-500/25',
      'Development': 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg shadow-orange-500/25',
      'Testing': 'bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-lg shadow-pink-500/25',
      'Launch': 'bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg shadow-green-500/25',
      'Abandoned': 'bg-gradient-to-r from-gray-400 to-gray-500 text-white shadow-lg shadow-gray-400/25'
    }
    return colors[status] || 'bg-gradient-to-r from-gray-400 to-gray-500 text-white shadow-lg shadow-gray-400/25'
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="relative">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-transparent bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"></div>
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-transparent bg-gradient-to-r from-blue-500 to-purple-600 rounded-full absolute top-0 left-0 animate-ping"></div>
          <div className="absolute inset-0 rounded-full bg-white"></div>
          <Sparkles className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 text-blue-600 animate-pulse" />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-1/2 -right-1/2 w-96 h-96 bg-gradient-to-br from-blue-400/10 to-purple-600/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-1/2 -left-1/2 w-96 h-96 bg-gradient-to-tr from-indigo-400/10 to-pink-600/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* Header */}
      <header className="relative bg-white/80 backdrop-blur-xl border-b border-white/20 shadow-lg shadow-black/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl blur opacity-75"></div>
                <div className="relative bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-xl">
                  <Lightbulb className="w-8 h-8 text-white" />
                </div>
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent">
                  IdeaTracker
                </h1>
                <p className="text-sm text-gray-500 font-medium">Transform ideas into reality</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-6">
              <div className="hidden md:block">
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 px-4 py-2 rounded-full border border-blue-200/50">
                  <span className="text-gray-700 font-medium">Welcome back, </span>
                  <span className="font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    {user?.name}!
                  </span>
                </div>
              </div>
              <button
                onClick={logout}
                className="group flex items-center space-x-2 px-4 py-2 rounded-xl bg-white/50 hover:bg-red-50 border border-gray-200/50 hover:border-red-200 transition-all duration-300 hover:shadow-lg hover:shadow-red-500/10"
              >
                <LogOut className="w-5 h-5 text-gray-500 group-hover:text-red-600 transition-colors" />
                <span className="text-gray-700 group-hover:text-red-600 font-medium transition-colors">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div className="group relative overflow-hidden bg-white/70 backdrop-blur-xl rounded-2xl p-8 border border-white/20 shadow-xl shadow-black/5 hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-500 hover:-translate-y-1">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative flex items-center">
              <div className="flex-shrink-0">
                <div className="p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl shadow-lg shadow-blue-500/25">
                  <Lightbulb className="w-8 h-8 text-white" />
                </div>
              </div>
              <div className="ml-6">
                <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Total Ideas</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">{ideas.length}</p>
              </div>
            </div>
          </div>
          
          <div className="group relative overflow-hidden bg-white/70 backdrop-blur-xl rounded-2xl p-8 border border-white/20 shadow-xl shadow-black/5 hover:shadow-2xl hover:shadow-green-500/10 transition-all duration-500 hover:-translate-y-1">
            <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-emerald-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative flex items-center">
              <div className="flex-shrink-0">
                <div className="p-3 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl shadow-lg shadow-green-500/25">
                  <TrendingUp className="w-8 h-8 text-white" />
                </div>
              </div>
              <div className="ml-6">
                <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider">In Development</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">
                  {ideas.filter(idea => ['Development', 'Testing'].includes(idea.status)).length}
                </p>
              </div>
            </div>
          </div>
          
          <div className="group relative overflow-hidden bg-white/70 backdrop-blur-xl rounded-2xl p-8 border border-white/20 shadow-xl shadow-black/5 hover:shadow-2xl hover:shadow-purple-500/10 transition-all duration-500 hover:-translate-y-1">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-violet-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative flex items-center">
              <div className="flex-shrink-0">
                <div className="p-3 bg-gradient-to-br from-purple-500 to-violet-600 rounded-2xl shadow-lg shadow-purple-500/25">
                  <Target className="w-8 h-8 text-white" />
                </div>
              </div>
              <div className="ml-6">
                <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Launched</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">
                  {ideas.filter(idea => idea.status === 'Launch').length}
                </p>
              </div>
            </div>
          </div>
          
          <div className="group relative overflow-hidden bg-white/70 backdrop-blur-xl rounded-2xl p-8 border border-white/20 shadow-xl shadow-black/5 hover:shadow-2xl hover:shadow-orange-500/10 transition-all duration-500 hover:-translate-y-1">
            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-red-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative flex items-center">
              <div className="flex-shrink-0">
                <div className="p-3 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl shadow-lg shadow-orange-500/25">
                  <Clock className="w-8 h-8 text-white" />
                </div>
              </div>
              <div className="ml-6">
                <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Planning</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">
                  {ideas.filter(idea => ['Idea', 'Research', 'Planning'].includes(idea.status)).length}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-10">
          <div className="flex flex-col sm:flex-row gap-4 flex-1 w-full lg:w-auto">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-2xl blur opacity-75"></div>
              <div className="relative bg-white/80 backdrop-blur-xl rounded-2xl border border-white/20 shadow-lg shadow-black/5">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search your brilliant ideas..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-transparent border-0 rounded-2xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                />
              </div>
            </div>
            
            {/* Filter */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-2xl blur opacity-75"></div>
              <div className="relative bg-white/80 backdrop-blur-xl rounded-2xl border border-white/20 shadow-lg shadow-black/5">
                <Filter className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="pl-12 pr-10 py-4 bg-transparent border-0 rounded-2xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500/20 appearance-none cursor-pointer min-w-48"
                >
                  <option value="all">All Status</option>
                  <option value="Idea">Idea</option>
                  <option value="Research">Research</option>
                  <option value="Planning">Planning</option>
                  <option value="Development">Development</option>
                  <option value="Testing">Testing</option>
                  <option value="Launch">Launch</option>
                  <option value="Abandoned">Abandoned</option>
                </select>
              </div>
            </div>
          </div>
          
          {/* Add Button */}
          <button
            onClick={() => {
              setEditingIdea(null)
              setShowForm(true)
            }}
            className="group relative overflow-hidden bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold px-8 py-4 rounded-2xl shadow-xl shadow-blue-500/25 hover:shadow-2xl hover:shadow-blue-500/40 transition-all duration-300 hover:-translate-y-1 flex items-center space-x-3"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <Plus className="w-5 h-5 relative z-10" />
            <span className="relative z-10">Add New Idea</span>
          </button>
        </div>

        {/* Ideas Grid */}
        {filteredIdeas.length === 0 ? (
          <div className="text-center py-20">
            <div className="relative inline-block mb-8">
              <div className="absolute inset-0 bg-gradient-to-r from-gray-300/20 to-gray-400/20 rounded-full blur-2xl"></div>
              <div className="relative bg-white/50 backdrop-blur-xl p-8 rounded-full border border-white/20 shadow-xl shadow-black/5">
                <Lightbulb className="w-20 h-20 text-gray-400 mx-auto" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              {ideas.length === 0 ? "Ready to spark innovation?" : "No ideas match your search"}
            </h3>
            <p className="text-gray-600 mb-8 text-lg max-w-md mx-auto leading-relaxed">
              {ideas.length === 0 
                ? "Every great startup begins with a single idea. Add yours and watch it grow into something amazing!"
                : "Try adjusting your search or filter criteria to discover more ideas."
              }
            </p>
            {ideas.length === 0 && (
              <button
                onClick={() => {
                  setEditingIdea(null)
                  setShowForm(true)
                }}
                className="group relative overflow-hidden bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold px-10 py-5 rounded-2xl shadow-xl shadow-blue-500/25 hover:shadow-2xl hover:shadow-blue-500/40 transition-all duration-300 hover:-translate-y-1"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <span className="relative z-10 text-lg">Add Your First Idea</span>
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {filteredIdeas.map((idea) => (
              <IdeaCard
                key={idea._id}
                idea={idea}
                onEdit={handleEdit}
                onDelete={handleDeleteIdea}
                getStatusColor={getStatusColor}
              />
            ))}
          </div>
        )}
      </main>

      {/* Idea Form Modal */}
      {showForm && (
        <IdeaForm
          idea={editingIdea}
          onSubmit={editingIdea ? handleUpdateIdea : handleCreateIdea}
          onClose={() => {
            setShowForm(false)
            setEditingIdea(null)
          }}
        />
      )}
    </div>
  )
}

export default Dashboard;