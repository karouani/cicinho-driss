var MySql = require('sync-mysql');
require("dotenv").config();

var connection = new MySql({
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 3306,
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'massage',
    insecureAuth: true
});

module.exports = connection;