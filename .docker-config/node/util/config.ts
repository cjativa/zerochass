import * as dotenv from 'dotenv';

dotenv.config();

export const Config = {
    port: process.env.PORT,

    graphEp: process.env.GRAPH_EP,
    graphToken: process.env.GRAPH_TOKEN,

    awsRegion: process.env.AWS_REGION,
    cognitoUserPoolId: process.env.COGNITO_USER_POOL_ID,
    cognitoWebClientId: process.env.COGNITO_WEB_CLIENT_ID,

    craftURL: process.env.NEXT_PUBLIC_CRAFT_CMS_URL,

    dbHost: process.env.DB_HOST,
    dbUser: process.env.DB_USER,
    dbPassword: process.env.DB_PASSWORD,
    dbName: process.env.DB_NAME,
}