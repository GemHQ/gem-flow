#!/bin/sh
./node_modules/.bin/knex migrate:latest
node server.js
