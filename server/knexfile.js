module.exports = {
  development: {
    client: 'pg',
    connection: process.env.DATABASE_URI || 'postgres://database/gem_flow',
    migrations: {
      directory: './db/migrations',
    },
    seeds: {
      directory: './db/seeds/dev',
    },
    useNullAsDefault: true,
    pool: { min: 1, max: 10 },
  },
};
