exports.up = function(knex) {
  const query = `CREATE TABLE users(
    id SERIAL PRIMARY KEY NOT NULL,
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
