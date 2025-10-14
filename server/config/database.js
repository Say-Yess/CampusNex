const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');

dotenv.config();

// Initialize Sequelize with PostgreSQL or SQLite fallback
const sequelize = process.env.DATABASE_URL
    ? new Sequelize(process.env.DATABASE_URL, {
        dialect: 'postgres',
        logging: process.env.NODE_ENV === 'development' ? console.log : false,
        dialectOptions: {
            ssl: process.env.NODE_ENV === 'production' ? { require: true, rejectUnauthorized: false } : false,
            // Force IPv4 for Railway compatibility
            family: 4
        },
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        },
        // Railway specific optimizations
        retry: {
            match: [
                /ECONNREFUSED/,
                /EHOSTUNREACH/,
                /ENOTFOUND/,
                /ENETUNREACH/,
                /EAI_AGAIN/
            ],
            max: 3
        }
    })
    : process.env.DB_HOST && process.env.DB_USER && process.env.DB_PASS
        ? new Sequelize(
            process.env.DB_NAME,
            process.env.DB_USER,
            process.env.DB_PASS,
            {
                host: process.env.DB_HOST,
                port: process.env.DB_PORT,
                dialect: 'postgres',
                logging: process.env.NODE_ENV === 'development' ? console.log : false,
                dialectOptions: {
                    ssl: process.env.NODE_ENV === 'production' ? { require: true, rejectUnauthorized: false } : false
                },
                pool: {
                    max: 5,
                    min: 0,
                    acquire: 30000,
                    idle: 10000
                }
            }
        )
        : new Sequelize({
            dialect: 'sqlite',
            storage: './database.sqlite',
            logging: process.env.NODE_ENV === 'development' ? console.log : false,
        });

module.exports = { sequelize };