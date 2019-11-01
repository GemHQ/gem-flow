-- -- extension for generating UUID
-- CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- -- main users table
-- CREATE TABLE users (
--   id UUID PRIMARY KEY DEFAULT uuid_generate_v1(),
--   gem_user_id UUID,
--   access_token VARCHAR(200)
-- );

-- -- references table users
-- CREATE TABLE profiles (
--   id UUID PRIMARY KEY DEFAULT uuid_generate_v1(),
--   access_token VARCHAR(200),
--   user_id UUID REFERENCES users(id) ON DELETE SET NULL
-- );

-- -- references table users
-- CREATE TABLE connections (
--   id UUID PRIMARY KEY DEFAULT uuid_generate_v1(),
--   access_token VARCHAR(200),
--   user_id UUID REFERENCES users(id) ON DELETE SET NULL
-- );

-- -- references table connections
-- CREATE TABLE accounts (
--   id UUID PRIMARY KEY DEFAULT uuid_generate_v1(),
--   connection_id UUID REFERENCES connections(id) ON DELETE SET NULL
-- );
-- CREATE DATABASE gem_flow;