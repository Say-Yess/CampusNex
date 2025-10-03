const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');

dotenv.config();

// SQLite configuration (alternative to PostgreSQL for local development)
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './campusnex.sqlite',
    logging: process.env.NODE_ENV === 'development' ? console.log : false
});

module.exports = { sequelize };