const { Pool } = require('pg');
const dotenv = require('dotenv');
dotenv.config();

const createUser = async (input) => {

  const text = 'INSERT INTO users(email) VALUES($1) RETURNING *';
  const values = [input.email];

  const pool = new Pool();
  const result = await pool.query(text, values);
  await pool.end()
  return result.rows[0];
}

const getUsers = async () => {

  const text = 'SELECT * FROM USERS';

  const pool = new Pool();
  const result = await pool.query(text);
  await pool.end()
  return result.rows;
}

module.exports = { createUser, getUsers };
