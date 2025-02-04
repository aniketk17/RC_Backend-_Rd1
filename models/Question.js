const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./User');

const Question = sequelize.define('Question', {
  id: { type: DataTypes.UUID, defaultValue : DataTypes.UUIDV4, primaryKey: true, autoIncrement: true },
  isSenior: { type: DataTypes.BOOLEAN, references: { model: User, key: 'isSenior' } },
  question: { type: DataTypes.TEXT, allowNull: false },
  options: { type: DataTypes.ARRAY(DataTypes.STRING), allowNull: false },
  correctOption: { type: DataTypes.STRING, allowNull: false }
});

module.exports = Question;
