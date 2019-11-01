const dotenv = require('dotenv');
dotenv.config({ path: '../.env' });

const environment = process.env.NODE_ENV || 'development',
  config = require('./knexfile.js')[environment],
  knex = require('knex')(config);

const createUser = async ({ gem_user_id, access_token }) => {
  try {
    const rows = await knex('users')
      .insert({ gem_user_id, access_token })
      .returning('*');
    return rows[0];
  } catch (e) {
    throw e;
  }
};

const listUsers = async () => {
  try {
    return await knex('users');
  } catch (e) {
    throw e;
  }
};

module.exports = { createUser, listUsers };
