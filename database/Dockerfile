FROM postgres:latest
WORKDIR /docker-entrypoint-initdb.d
COPY ./init.sql .
EXPOSE 5432
