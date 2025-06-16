import React, { useState, useEffect } from 'react'
import { X, Lightbulb, Target, Users, DollarSign, Clock, TrendingUp, Zap, Sparkles, ChevronRight } from 'lucide-react'

const IdeaForm = ({ idea, onSubmit, onClose }) => {
  const [formData, setFormData] = useState({
    ideaName: '',
    targetAudience: '',
    problemSolved: '',
    description: '',
    category: 'Technology',
    marketSize: 'Unknown',
    competitionLevel: 'Unknown',
    estimatedBudget: '',
    timeToMarket: '',
    notes: '',
    status: 'Idea'
  })
  const [loading, setLoading] = useState(false)
  const [activeSection, setActiveSection] = useState(0)

  useEffect(() => {
    if (idea) {
      setFormData(idea)
    }
  }, [idea])

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
      await onSubmit(formData)
    } finally {
      setLoading(false)
    }
  }

  const sections = [
    { id: 0, title: 'Core Concept', icon: Lightbulb, color: 'text-amber-400' },
    { id: 1, title: 'Market Analysis', icon: TrendingUp, color: 'text-blue-400' },
    { id: 2, title: 'Execution Plan', icon: Zap, color: 'text-emerald-400' },
  ]

  const getStatusColor = (status) => {
    const colors = {
      'Idea': 'from-violet-500 to-purple-500',
      'Research': 'from-blue-500 to-indigo-500',
      'Planning': 'from-amber-500 to-orange-500',
      'Development': 'from-emerald-500 to-teal-500',
      'Testing': 'from-cyan-500 to-blue-500',
      'Launch': 'from-rose-500 to-pink-500',
      'Abandoned': 'from-gray-500 to-slate-500'
    }
    return colors[status] || colors['Idea']
  }

  const nextSection = () => {
    if (activeSection < sections.length - 1) {
      setActiveSection(activeSection + 1)
    }
  }

  const prevSection = () => {
    if (activeSection > 0) {
      setActiveSection(activeSection - 1)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-white rounded-2xl shadow-2xl overflow-hidden">
        
        {/* Header */}
        <div className="relative bg-gradient-to-r from-slate-50 to-gray-50 border-b border-gray-100 px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-violet-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  {idea ? 'Edit Idea' : 'New Idea'}
                </h2>
                <p className="text-gray-500 text-sm">Transform your vision into reality</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors duration-200"
            >
              <X className="w-5 h-5 text-gray-600" />
            </button>
          </div>

          {/* Progress Steps */}
          <div className="flex items-center justify-center mt-6 space-x-8">
            {sections.map((section, index) => {
              const Icon = section.icon
              const isActive = activeSection === index
              const isCompleted = activeSection > index
              
              return (
                <div key={section.id} className="flex items-center">
                  <div
                    className={`flex items-center space-x-3 px-4 py-2 rounded-full cursor-pointer transition-all duration-300 ${
                      isActive
                        ? 'bg-violet-100 text-violet-700'
                        : isCompleted
                        ? 'bg-green-100 text-green-700'
                        : 'text-gray-400 hover:text-gray-600'
                    }`}
                    onClick={() => setActiveSection(index)}
                  >
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      isActive
                        ? 'bg-violet-500 text-white'
                        : isCompleted
                        ? 'bg-green-500 text-white'
                        : 'bg-gray-200'
                    }`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-sm font-medium hidden sm:block">{section.title}</span>
                  </div>
                  {index < sections.length - 1 && (
                    <ChevronRight className="w-4 h-4 text-gray-300 mx-2" />
                  )}
                </div>
              )
            })}
          </div>
        </div>

        {/* Form Content */}
        <div className="overflow-y-auto max-h-[calc(90vh-200px)]">
          <div className="p-8">
            
            {/* Core Concept Section */}
            {activeSection === 0 && (
              <div className="space-y-6 animate-in fade-in duration-300">
                <div className="text-center mb-8">
                  <Lightbulb className="w-16 h-16 text-amber-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Core Concept</h3>
                  <p className="text-gray-500">Define the essence of your idea</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Idea Name *
                    </label>
                    <input
                      type="text"
                      name="ideaName"
                      value={formData.ideaName}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all duration-200"
                      placeholder="Enter your idea name..."
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Category *
                    </label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all duration-200"
                      required
                    >
                      <option value="Technology">Technology</option>
                      <option value="Healthcare">Healthcare</option>
                      <option value="Education">Education</option>
                      <option value="Finance">Finance</option>
                      <option value="E-commerce">E-commerce</option>
                      <option value="Social">Social</option>
                      <option value="Entertainment">Entertainment</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Target Audience *
                    </label>
                    <input
                      type="text"
                      name="targetAudience"
                      value={formData.targetAudience}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all duration-200"
                      placeholder="Who is this for?"
                      required
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Problem It Solves *
                    </label>
                    <textarea
                      name="problemSolved"
                      value={formData.problemSolved}
                      onChange={handleChange}
                      rows={3}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all duration-200 resize-none"
                      placeholder="What problem does this solve?"
                      required
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Description *
                    </label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all duration-200 resize-none"
                      placeholder="Describe your idea in detail..."
                      required
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Market Analysis Section */}
            {activeSection === 1 && (
              <div className="space-y-6 animate-in fade-in duration-300">
                <div className="text-center mb-8">
                  <TrendingUp className="w-16 h-16 text-blue-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Market Analysis</h3>
                  <p className="text-gray-500">Understand your market landscape</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Market Size
                    </label>
                    <select
                      name="marketSize"
                      value={formData.marketSize}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all duration-200"
                    >
                      <option value="Unknown">Unknown</option>
                      <option value="Small">Small ($1M - $10M)</option>
                      <option value="Medium">Medium ($10M - $100M)</option>
                      <option value="Large">Large ($100M+)</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Competition Level
                    </label>
                    <select
                      name="competitionLevel"
                      value={formData.competitionLevel}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all duration-200"
                    >
                      <option value="Unknown">Unknown</option>
                      <option value="Low">Low - Blue Ocean</option>
                      <option value="Medium">Medium - Some Players</option>
                      <option value="High">High - Saturated</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* Execution Plan Section */}
            {activeSection === 2 && (
              <div className="space-y-6 animate-in fade-in duration-300">
                <div className="text-center mb-8">
                  <Zap className="w-16 h-16 text-emerald-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Execution Plan</h3>
                  <p className="text-gray-500">Plan your path to success</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Estimated Budget
                    </label>
                    <input
                      type="text"
                      name="estimatedBudget"
                      value={formData.estimatedBudget}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all duration-200"
                      placeholder="e.g., $10K - $50K"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Time to Market
                    </label>
                    <input
                      type="text"
                      name="timeToMarket"
                      value={formData.timeToMarket}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all duration-200"
                      placeholder="e.g., 6 months, 1 year"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Current Status
                    </label>
                    <div className="relative">
                      <select
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all duration-200 appearance-none"
                      >
                        <option value="Idea">💡 Idea</option>
                        <option value="Research">🔍 Research</option>
                        <option value="Planning">📋 Planning</option>
                        <option value="Development">⚡ Development</option>
                        <option value="Testing">🧪 Testing</option>
                        <option value="Launch">🚀 Launch</option>
                        <option value="Abandoned">❌ Abandoned</option>
                      </select>
                      <div className={`absolute right-4 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-gradient-to-r ${getStatusColor(formData.status)}`}></div>
                    </div>
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Notes
                    </label>
                    <textarea
                      name="notes"
                      value={formData.notes}
                      onChange={handleChange}
                      rows={3}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all duration-200 resize-none"
                      placeholder="Additional notes or considerations..."
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between items-center pt-8 mt-8 border-t border-gray-100">
              <button
                type="button"
                onClick={prevSection}
                className={`px-6 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                  activeSection === 0
                    ? 'text-gray-400 cursor-not-allowed'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
                disabled={activeSection === 0}
              >
                Previous
              </button>

              <div className="flex space-x-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-6 py-2 text-sm font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg transition-all duration-200"
                  disabled={loading}
                >
                  Cancel
                </button>
                
                {activeSection < sections.length - 1 ? (
                  <button
                    type="button"
                    onClick={nextSection}
                    className="px-6 py-2 text-sm font-medium text-white bg-violet-500 hover:bg-violet-600 rounded-lg transition-all duration-200 flex items-center space-x-2"
                  >
                    <span>Next</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    onClick={handleSubmit}
                    className={`px-6 py-2 text-sm font-medium text-white bg-gradient-to-r ${getStatusColor(formData.status)} hover:shadow-lg rounded-lg transition-all duration-200 flex items-center space-x-2`}
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-2 border-white/30 border-t-white"></div>
                        <span>{idea ? 'Updating...' : 'Creating...'}</span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4" />
                        <span>{idea ? 'Update Idea' : 'Create Idea'}</span>
                      </>
                    )}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default IdeaForm;