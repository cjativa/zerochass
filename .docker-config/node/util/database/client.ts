import { Pool } from 'pg';
import { Config } from '../config';

/** Configure the database pool for client connections */
const pool = new Pool({
    user: Config.dbUser,
    host: Config.dbHost,
    database: Config.dbName,
    password: Config.dbPassword,
});

// Exit on errors
pool.on('error', (error, client) => {
    console.log(`Unexpected error on idle client`, error);
    process.exit(-1);
});

export class Client {

    /** Executes the provided database query
     * @params query - The query to execute
     * @params values - An array of values to be passed into the query (optional)
     */
    public static async executeQuery(query: string, values?: any[]) {
        try {
            // Get a client from pool
            const client = await pool.connect();

            // Execute the query
            try {
                const result = (values) ? await client.query(query, values) : await client.query(query);
                return result
            }

            // Handle any errors with the query
            catch (error) {
                console.log(`An error occurred executing the query ${query} \n`, error);
            }

            // Release the client regardless
            finally { client.release() }
        }

        catch (error) {
            console.log(`An error occurred connecting to the pool`, error);
        }
    }
};