export default [
    {
        name: "default",
        type: process.env.TYPEORM_TYPE || "sqlite",
        database: "./src/database/" + process.env.TYPEORM_DATABASE,

        migrations: [process.env.TYPEORM_MIGRATIONS],
        entities: [process.env.TYPEORM_ENTITIES],
        cli: {
            migrationsDir: process.env.TYPEORM_MIGRATIONDIR,
        },

        charset: "utf8mb4",
        collation: "utf8mb4_general_ci",

        acquireTimeout: process.env.TYPEORM_TIMEOUT,
        migrationsRun: process.env.TYPEORM_MIGRATIONS_RUN,
        synchronize: process.env.TYPEORM_SYNCHRONIZE,

        logging: process.env.TYPEORM_LOGGING,
        logger: "advanced-console",
    },
];
