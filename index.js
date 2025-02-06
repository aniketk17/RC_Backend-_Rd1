const express = require('express');
const db = require('./config/db.js');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const progressRoutes = require('./routes/progressRoutes');
const questionRoutes = require('./routes/questionRoutes');
const lifelineRoutes = require('./routes/lifelineRoutes');
const cors = require('cors');
const leaderboardRoutes = require('./routes/leaderboardRoutes');
const Leaderboard = require('./models/leaderboard');
const { updateProgress } = require('./controllers/progressController.js');

require('dotenv').config();
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

// Routes
app.use('/login', authRoutes);
app.use('/quiz', questionRoutes);
app.use('/progress', progressRoutes);
app.use('/lifelines', lifelineRoutes);
app.use('/leaderboard', leaderboardRoutes);

// Start the server
const start = async () => {
  console.log("Testing the database connection...");
  try {
    await db.authenticate();
    await db.sync({ force: false }); // or { alter: true }
    console.log("Database synced!");

    console.log("Connection has been established successfully.");

    const PORT = process.env.PORT || 5001; // Use environment variable for flexibility
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Unable to connect to the database:", error.original);
  }
};

start();
