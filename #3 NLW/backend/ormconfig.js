// {
//     "type": "sqlite",
//     "database": "./src/database/database.sqlite",
//     "migrations": [
//         "./src/database/migrations/*.ts"
//     ],
//     "entities": [
//         "./src/models/*.ts"
//     ],
//     "cli": {
//         "migrationsDir": "./src/database/migrations"
//     }
// }
const path = require('path');

module.exports = {
    type: process.env.TYPEORM_HOST || 'sqlite',
    host: process.env.TYPEORM_HOST,
    username: process.env.TYPEORM_USERNAME,
    password: process.env.TYPEORM_PASSWORD,

    database: './src/database/' + process.env.TYPEORM_DATABASE,
    port: Number(process.env.TYPEORM_PORT),

    migrations: [path.join(__dirname, 'src', 'database', 'migrations', '*.ts')],
    entities: [path.join(__dirname, 'src', 'models', '*.ts')],
    cli: {
        migrationsDir: [path.join(__dirname, 'src', 'database', 'migrations')],
    },

    synchronize: process.env.TYPEORM_SYNCHRONIZE,
};
