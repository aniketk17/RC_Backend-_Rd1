const express = require('express');
const db = require('./config/db.js');
const authRoutes = require('./routes/authRoutes');

require('dotenv').config();
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/login', authRoutes);

// Start the server

const start = async () => {
  console.log("Testing the database connection..");
  try {
    await db.authenticate();
    await db.sync({ alter: true });
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error.original);
  }
}

start();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});