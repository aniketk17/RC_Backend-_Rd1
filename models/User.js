const { DataTypes } = require('sequelize');
const db = require('../config/db');

const User = db.define('User', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  admissionYear: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  branch: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  collegeId: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  isSenior: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  progressId: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  finalResult: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  startTime: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = User;
