export default {
    database: process.env.TYPEORM_DB_DATABASE,
    username: process.env.TYPEORM_DB_USERNAME,
    password: process.env.TYPEORM_DB_PASSWORD,
    host: process.env.TYPEORM_DB_HOSTNAME,
    port: process.env.TYPEORM_DB_PORT,
    type: process.env.TYPEORM_DB_TYPE,
}
