const { DataTypes } = require('sequelize');
const db = require('../config/db');
const UserModel = require('./UserModel'); // Importing 'UserModel'
const Question = require('./Question');

const Progress = db.define('Progress', {
  progress_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,  // Automatically generate a unique progress_id
  },
  user_id: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'UserModel',
      key: 'user_id',  // Reference the user_id in the User model
    },
    onDelete: 'CASCADE',  // Ensures deleting a user will delete their progress
  },

  question_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Question', // Change from `Question` to `'Questions'`
      key: 'question_id',
    },
    onDelete: 'SET NULL',
  },
  current_question_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  first_attempt: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
    allowNull: false,
  },
  second_attempt: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    allowNull: true,
  },
  marks: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  lifelines_used: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  streak: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
}, {
  freezeTableName: true,  // Prevent Sequelize from pluralizing the table name
  timestamps: true,  // Enable createdAt & updatedAt
});

module.exports = Progress;
