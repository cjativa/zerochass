import Config from './utils/config';

export const KnexConfiguration = {
    development: {
        client: 'pg',
        connection: {
            host: Config.dbHost,
            user: Config.dbUser,
            password: Config.dbUser,
            database: Config.dbName,
            port: 5432
        },
        migrations: {
            directory: __dirname + '/db/pg/migrations'
        },
        seeds: {
            directory: __dirname + '/db/pg/seeds/development'
        }
    },
    production: {
        client: 'pg',
        connection: {
            host: Config.dbHost,
            user: Config.dbUser,
            password: Config.dbUser,
            database: Config.dbName,
            ssl: true
        },
        migrations: {
            directory: __dirname + '/db/pg/migrations'
        },
        seeds: {
            directory: __dirname + '/db/pg/seeds/production'
        }
    }
}