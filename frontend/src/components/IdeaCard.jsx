import React, { useState } from 'react'
import { Edit2, Trash2, Calendar, Target, TrendingUp, Tag, Sparkles, Zap, DollarSign, Clock } from 'lucide-react'

const IdeaCard = ({ idea, onEdit, onDelete, getStatusColor }) => {
  const [isHovered, setIsHovered] = useState(false)
  const [isPressed, setIsPressed] = useState(false)

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  // Mock data for demonstration if no idea prop
  const mockIdea = {
    ideaName: "AI-Powered Personal Fitness Trainer",
    status: "In Progress",
    category: "HealthTech",
    targetAudience: "Fitness enthusiasts aged 25-45 who prefer home workouts",
    problemSolved: "Many people struggle to maintain consistent workout routines due to lack of personalized guidance and motivation",
    createdAt: "2024-01-15",
    marketSize: "Large",
    estimatedBudget: "$50,000 - $100,000",
    timeToMarket: "8-12 months",
    _id: "1"
  }

  const cardData = idea || mockIdea

  const defaultGetStatusColor = (status) => {
    switch(status) {
      case 'In Progress': return 'bg-blue-100 text-blue-800 border border-blue-200'
      case 'Completed': return 'bg-green-100 text-green-800 border border-green-200'
      case 'On Hold': return 'bg-yellow-100 text-yellow-800 border border-yellow-200'
      default: return 'bg-gray-100 text-gray-800 border border-gray-200'
    }
  }

  const statusColorFunc = getStatusColor || defaultGetStatusColor

  return (
    <div 
      className="group relative overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
    >
      {/* Animated Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-blue-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
      
      {/* Floating Sparkles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute top-4 right-4 text-yellow-400 transition-all duration-1000 ${isHovered ? 'opacity-100 scale-110 rotate-12' : 'opacity-0 scale-50'}`}>
          <Sparkles className="w-4 h-4" />
        </div>
        <div className={`absolute top-8 left-6 text-purple-400 transition-all duration-1000 delay-200 ${isHovered ? 'opacity-100 scale-110 -rotate-12' : 'opacity-0 scale-50'}`}>
          <Zap className="w-3 h-3" />
        </div>
        <div className={`absolute bottom-6 right-8 text-blue-400 transition-all duration-1000 delay-400 ${isHovered ? 'opacity-100 scale-110 rotate-45' : 'opacity-0 scale-50'}`}>
          <Sparkles className="w-3 h-3" />
        </div>
      </div>

      {/* Main Card */}
      <div className={`
        relative bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-3xl p-6 
        shadow-lg shadow-gray-200/20 
        transition-all duration-500 ease-out
        ${isHovered ? 'shadow-2xl shadow-purple-500/10 -translate-y-2 scale-[1.02] border-purple-200/30' : ''}
        ${isPressed ? 'scale-[0.98]' : ''}
        hover:bg-white/90
      `}>
        
        {/* Animated Border Glow */}
        <div className={`absolute inset-0 rounded-3xl bg-gradient-to-r from-purple-500 via-blue-500 to-pink-500 opacity-0 transition-opacity duration-500 ${isHovered ? 'opacity-20' : ''}`} style={{padding: '1px'}}>
          <div className="w-full h-full bg-white rounded-3xl" />
        </div>

        {/* Header */}
        <div className="relative flex justify-between items-start mb-6">
          <div className="flex-1">
            <h3 className={`text-xl font-bold text-gray-900 mb-3 line-clamp-2 transition-all duration-300 ${isHovered ? 'text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600' : ''}`}>
              {cardData.ideaName}
            </h3>
            <div className="flex items-center space-x-3 mb-2">
              <span className={`px-4 py-2 text-xs font-semibold rounded-full transition-all duration-300 ${statusColorFunc(cardData.status)} ${isHovered ? 'scale-105 shadow-md' : ''}`}>
                {cardData.status}
              </span>
              <span className={`px-4 py-2 text-xs font-semibold bg-gradient-to-r from-gray-100 to-gray-50 text-gray-700 rounded-full border border-gray-200 transition-all duration-300 ${isHovered ? 'scale-105 shadow-md bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200' : ''}`}>
                {cardData.category}
              </span>
            </div>
          </div>
                  
          <div className="flex space-x-2 ml-4">
            <button
              onClick={() => onEdit && onEdit(cardData)}
              className="p-3 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-2xl transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-blue-200/30 group/btn"
              title="Edit idea"
            >
              <Edit2 className="w-4 h-4 transition-transform duration-300 group-hover/btn:rotate-12" />
            </button>
            <button
              onClick={() => onDelete && onDelete(cardData._id)}
              className="p-3 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-2xl transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-red-200/30 group/btn"
              title="Delete idea"
            >
              <Trash2 className="w-4 h-4 transition-transform duration-300 group-hover/btn:scale-110" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-4 mb-6">
          <div className={`flex items-start space-x-3 p-4 rounded-2xl bg-gradient-to-r from-purple-50/50 to-transparent border border-purple-100/50 transition-all duration-500 ${isHovered ? 'bg-gradient-to-r from-purple-50 to-blue-50/30 border-purple-200/50 transform translate-x-1' : ''}`}>
            <div className={`p-2 rounded-xl bg-purple-100 transition-all duration-300 ${isHovered ? 'bg-purple-200 scale-110 rotate-3' : ''}`}>
              <Target className="w-4 h-4 text-purple-600" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-gray-800 mb-1">Target Audience</p>
              <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed">{cardData.targetAudience}</p>
            </div>
          </div>
                  
          <div className={`flex items-start space-x-3 p-4 rounded-2xl bg-gradient-to-r from-green-50/50 to-transparent border border-green-100/50 transition-all duration-500 delay-100 ${isHovered ? 'bg-gradient-to-r from-green-50 to-emerald-50/30 border-green-200/50 transform translate-x-1' : ''}`}>
            <div className={`p-2 rounded-xl bg-green-100 transition-all duration-300 ${isHovered ? 'bg-green-200 scale-110 -rotate-3' : ''}`}>
              <TrendingUp className="w-4 h-4 text-green-600" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-gray-800 mb-1">Problem Solved</p>
              <p className="text-sm text-gray-600 line-clamp-3 leading-relaxed">{cardData.problemSolved}</p>
            </div>
          </div>
        </div>

        {/* Meta Info */}
        <div className={`border-t border-gray-100 pt-5 space-y-3 transition-all duration-300 ${isHovered ? 'border-purple-100' : ''}`}>
          <div className="flex items-center justify-between">
            <div className={`flex items-center space-x-2 text-xs text-gray-500 transition-all duration-300 ${isHovered ? 'text-gray-600' : ''}`}>
              <div className={`p-1.5 rounded-lg bg-gray-100 transition-all duration-300 ${isHovered ? 'bg-blue-100 scale-105' : ''}`}>
                <Calendar className="w-3 h-3" />
              </div>
              <span className="font-medium">Created {formatDate(cardData.createdAt)}</span>
            </div>
            {cardData.marketSize !== 'Unknown' && (
              <div className={`flex items-center space-x-2 text-xs text-gray-500 transition-all duration-300 ${isHovered ? 'text-gray-600' : ''}`}>
                <div className={`p-1.5 rounded-lg bg-gray-100 transition-all duration-300 ${isHovered ? 'bg-purple-100 scale-105' : ''}`}>
                  <Tag className="w-3 h-3" />
                </div>
                <span className="font-medium">{cardData.marketSize} Market</span>
              </div>
            )}
          </div>
                  
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {cardData.estimatedBudget && (
              <div className={`flex items-center space-x-2 text-xs text-gray-500 p-3 rounded-xl bg-gradient-to-r from-yellow-50/50 to-transparent border border-yellow-100/30 transition-all duration-300 ${isHovered ? 'bg-gradient-to-r from-yellow-50 to-orange-50/30 border-yellow-200/50 scale-105' : ''}`}>
                <div className={`p-1.5 rounded-lg bg-yellow-100 transition-all duration-300 ${isHovered ? 'bg-yellow-200 rotate-12' : ''}`}>
                  <DollarSign className="w-3 h-3 text-yellow-600" />
                </div>
                <div>
                  <span className="font-semibold text-gray-700">Budget:</span>
                  <div className="font-medium text-gray-600">{cardData.estimatedBudget}</div>
                </div>
              </div>
            )}
                  
            {cardData.timeToMarket && (
              <div className={`flex items-center space-x-2 text-xs text-gray-500 p-3 rounded-xl bg-gradient-to-r from-blue-50/50 to-transparent border border-blue-100/30 transition-all duration-300 ${isHovered ? 'bg-gradient-to-r from-blue-50 to-cyan-50/30 border-blue-200/50 scale-105' : ''}`}>
                <div className={`p-1.5 rounded-lg bg-blue-100 transition-all duration-300 ${isHovered ? 'bg-blue-200 -rotate-12' : ''}`}>
                  <Clock className="w-3 h-3 text-blue-600" />
                </div>
                <div>
                  <span className="font-semibold text-gray-700">Time to Market:</span>
                  <div className="font-medium text-gray-600">{cardData.timeToMarket}</div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Hover Shine Effect */}
        <div className={`absolute inset-0 rounded-3xl bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 transition-all duration-1000 ${isHovered ? 'translate-x-full' : '-translate-x-full'}`} />
      </div>
    </div>
  )
}

export default IdeaCard