module.exports = {
  development: {
    client: 'pg',
    connection: `postgres://user:pass@postgresdb:5432/postgres`,
    migrations: {
      directory: './migrations',
    },
    seeds: {
      directory: './seeds',
    },
    useNullAsDefault: true,
  },
}
