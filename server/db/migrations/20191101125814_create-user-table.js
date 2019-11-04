exports.up = function(knex) {
  const query = `
  CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
  CREATE TABLE users(
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    gem_user_id VARCHAR(255), 
    access_token VARCHAR(255),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
  );`;
  return knex.raw(query);
};

exports.down = function(knex) {
  const query = `DROP TABLE users;`;
  return knex.raw(query);
};
