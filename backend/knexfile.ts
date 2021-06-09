module.exports = {
  development: {
    client: 'pg',
    connection: `postgres://user:pass@postgresdb:5432/pizza_shop_db`,
    migrations: {
      directory: './migrations',
    },
    seeds: {
      directory: './seeds',
    },
    useNullAsDefault: true,
  },
}
