const { DataTypes } = require('sequelize');
const db = require('../config/db');
const User = require('./User');
const Question = require('./Question');

const Progress = db.define('Progress', {
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id'
    },
    unique: true
  },
  question_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Question,
      key: 'id'
    }
  },
  current_question_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  first_attempt: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    allowNull: false
  },
  second_attempt: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    allowNull: true
  },
  lifeline_counter: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  marks: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  streak: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  }
});

module.exports = Progress;