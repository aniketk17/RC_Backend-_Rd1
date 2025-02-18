const express = require('express');
const {sequelize, syncDatabase} = require('./config/db.js');
const authRoutes = require('./routes/authRoutes');
//const questionRoutes = require('./routes/questionRoutes');
//const lifelineRoutes = require('./routes/lifelineRoutes');
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use(cookieParser());
// Routes
app.use('/', authRoutes);
//app.use('/', questionRoutes);
//app.use('/', lifelineRoutes);

// Start the server

app.get('/', (req, res) => {
  res.send('Server is up and running!');
});
const PORT = process.env.PORT || 5000;

// Start the server
app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);
  await syncDatabase();
});