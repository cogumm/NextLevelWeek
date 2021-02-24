/**
 * Arquivo que lê o ormconfig, assim podemos utilizar o cli do typeorm.
 */
import { Connection, createConnection, getConnectionOptions } from "typeorm";

export default async (): Promise<Connection> => {
    const defaultOptions = await getConnectionOptions();

    return createConnection(
        Object.assign(defaultOptions, {
            database:
                process.env.NODE_ENV === "test"
                    ? process.env.TYPEORM_DATABASE_TEST
                    : defaultOptions.database,
        })
    );
};
