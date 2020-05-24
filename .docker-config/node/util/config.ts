import * as dotenv from 'dotenv';

dotenv.config();

export const Config = {
    craftURL: process.env.NEXT_PUBLIC_CRAFT_CMS_URL,

    dbHost: process.env.DB_HOST,
    dbUser: process.env.DB_USER,
    dbPassword: process.env.DB_PASSWORD,
    dbName: process.env.DB_NAME,
}