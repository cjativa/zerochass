const Config = {
    craftURL: process.env.NEXT_PUBLIC_CRAFT_CMS_URL,

    dbHost: process.env.DB_HOST,
    dbUser: process.env.DB_USER,
    dbPassword: process.env.DB_PASSWORD,
    dbName: process.env.DB_NAME,

    zerochassSecret: process.env.ZEROCHASS_SECRET,

    awsRegion: process.env.AWS_REGION,
    awsBucket: process.env.AWS_BUCKET,

    port: process.env.PORT,

    environment: 'development'.toLowerCase()
};

export default Config;