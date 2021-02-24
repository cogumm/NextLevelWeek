export default [
    {
        name: "default",
        type: process.env.DB_TYPE || "sqlite",
        database: "./src/database/" + process.env.DB_DATABASE,

        migrations: [process.env.DB_MIGRATIONS],
        entities: [process.env.DB_ENTITIES],
        cli: {
            migrationsDir: process.env.DB_MIGRATIONDIR,
        },

        charset: "utf8mb4",
        collation: "utf8mb4_general_ci",

        acquireTimeout: process.env.DB_TIMEOUT,
        migrationsRun: process.env.DB_MIGRATIONS_RUN,
        synchronize: process.env.DB_SYNCHRONIZE,

        logging: process.env.DB_LOGGING,
        logger: "advanced-console",
    },
];
