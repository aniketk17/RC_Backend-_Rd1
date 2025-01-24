const { DataTypes } = require('sequelize');
const db = require('../config/db');

const User = db.define('User', {
  collegeId: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
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
  isSenior: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  finalResult: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  startTime: {
    type: DataTypes.DATE,
    allowNull: true,
  },
});

module.exports = User;
