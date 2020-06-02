require("dotenv").config();
import path from "path";

/**
 * Arquivo de configurações do KNEX.
 */
module.exports = {
    development: {
        client: "sqlite3",
        connection: {
            filename: path.resolve(
                __dirname,
                "src",
                "database",
                String(process.env.SQLITE_FILENAME)
            ),
        },
        migrations: {
            directory: path.resolve(__dirname, "src", "database", "migrations"),
        },
        seeds: {
            directory: path.resolve(__dirname, "src", "database", "seeds"),
        },
        useNullAsDefault: true,
    },

    staging: {
        client: "pg",
        connection: {
            database: "my_db",
            user: "username",
            password: "password",
        },
        pool: {
            min: 2,
            max: 10,
        },
        migrations: {
            tableName: "db_migrations",
        },
    },

    production: {
        client: "pg",
        connection: {
            database: "my_db",
            user: "username",
            password: "password",
        },
        pool: {
            min: 2,
            max: 10,
        },
        migrations: {
            tableName: "db_migrations",
        },
    },
};
