require('dotenv').config();
// In db.js
const { Pool } = require('pg');

const connectionString = process.env.PG_URL;

const pool = new Pool({
  connectionString,
});

module.exports = pool;
