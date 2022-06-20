// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
  development: {
    client: "sqlite3",
    connection: {
      filename: "./data/db.sqlite",
    },
    migrations: {
      tableName: "knex_migrations"
    },
    useNullAsDefault: true
  },
};
