const { DataTypes } = require('sequelize');
const db = require('../config/db'); // Ensure this correctly initializes Sequelize

const Question = db.define('Question', {
  question_id: {
    type: DataTypes.INTEGER,  // Use INTEGER for auto-increment
    autoIncrement: true,  // Auto-incrementing integer
    primaryKey: true,  // 'question_id' as the primary key
  },
  category: {
    type: DataTypes.STRING(50), // Use STRING with length 50 for 'category'
    allowNull: false,  // Ensure it is not null
  },
  question_text: {
    type: DataTypes.TEXT,
    allowNull: false,  // 'question_text' cannot be null
  },
  answer: {
    type: DataTypes.STRING(255),
    allowNull: false,  // 'answer' cannot be null
  }
}, {
  freezeTableName: true,  // Prevent Sequelize from pluralizing table name
  timestamps: true, // Enable createdAt & updatedAt
});

module.exports = Question;
