const mongoose = require('mongoose');

const ideaSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  ideaName: {
    type: String,
    required: true,
    trim: true
  },
  targetAudience: {
    type: String,
    required: true,
    trim: true
  },
  problemSolved: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  category: {
    type: String,
    required: true,
    enum: ['Technology', 'Healthcare', 'Education', 'Finance', 'E-commerce', 'Social', 'Entertainment', 'Other']
  },
  marketSize: {
    type: String,
    enum: ['Small', 'Medium', 'Large', 'Unknown'],
    default: 'Unknown'
  },
  competitionLevel: {
    type: String,
    enum: ['Low', 'Medium', 'High', 'Unknown'],
    default: 'Unknown'
  },
  estimatedBudget: {
    type: String,
    trim: true
  },
  timeToMarket: {
    type: String,
    trim: true
  },
  notes: {
    type: String,
    trim: true
  },
  status: {
    type: String,
    enum: ['Idea', 'Research', 'Planning', 'Development', 'Testing', 'Launch', 'Abandoned'],
    default: 'Idea'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Idea', ideaSchema);
