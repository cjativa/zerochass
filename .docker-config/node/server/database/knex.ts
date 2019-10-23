import * as knexLib from 'knex';
import { Config } from '../config';

export const knex = knexLib({
    client: 'pg',
    connection: {
        host: Config.dbHost,
        user: Config.dbUser,
        password: Config.dbPassword,
        database: Config.dbName
    }
});