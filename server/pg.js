const { Pool } = require('pg');
const dotenv = require('dotenv');
dotenv.config({path: '../.env'});

const createUser = async (input) => {

  const text = 'INSERT INTO users(gem_user_id, access_token) VALUES($1, $2) RETURNING *';
  const values = [input.gem_user_id, input.access_token];

  const pool = new Pool();
  const result = await pool.query(text, values);
  await pool.end()
  return result.rows[0];
}

const listUsers = async () => {

  const text = 'SELECT * FROM USERS';

  const pool = new Pool();
  const result = await pool.query(text);
  await pool.end()
  return result.rows;
}

module.exports = { createUser, listUsers };
