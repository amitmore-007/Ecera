const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');
const ideaRoutes = require('./routes/idea');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware

app.use(cors({
  origin: [
    
    'http://localhost:3000' // keep this for local development
  ],
  credentials: true
}));


app.use(express.json());

// Database connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/startup-tracker', {
  
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log('MongoDB connection error:', err));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/ideas', ideaRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'Startup Idea Tracker API' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
