const express = require('express');
const Idea = require('../models/Idea');
const auth = require('../middleware/auth');

const router = express.Router();

// Get all ideas for the authenticated user
router.get('/', auth, async (req, res) => {
  try {
    const ideas = await Idea.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(ideas);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get single idea
router.get('/:id', auth, async (req, res) => {
  try {
    const idea = await Idea.findOne({ _id: req.params.id, user: req.user._id });
    if (!idea) {
      return res.status(404).json({ message: 'Idea not found' });
    }
    res.json(idea);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Create new idea
router.post('/', auth, async (req, res) => {
  try {
    const ideaData = {
      ...req.body,
      user: req.user._id
    };
    
    const idea = new Idea(ideaData);
    await idea.save();
    res.status(201).json(idea);
  } catch (error) {
    res.status(400).json({ message: 'Validation error', error: error.message });
  }
});

// Update idea
router.put('/:id', auth, async (req, res) => {
  try {
    const idea = await Idea.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!idea) {
      return res.status(404).json({ message: 'Idea not found' });
    }
    
    res.json(idea);
  } catch (error) {
    res.status(400).json({ message: 'Update error', error: error.message });
  }
});

// Delete idea
router.delete('/:id', auth, async (req, res) => {
  try {
    const idea = await Idea.findOneAndDelete({ _id: req.params.id, user: req.user._id });
    
    if (!idea) {
      return res.status(404).json({ message: 'Idea not found' });
    }
    
    res.json({ message: 'Idea deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
