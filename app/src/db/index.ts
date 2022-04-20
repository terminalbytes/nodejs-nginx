import { Sequelize, SequelizeOptions } from "sequelize-typescript";
import { logger } from "@utils/logger";

const DB_ENGINE = "postgres";
const { DB_HOST, DB_USERNAME, DB_PASSWORD, DB_NAME, DB_PORT } = process.env;

const config: SequelizeOptions = {
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: DB_NAME,
    host: DB_HOST,
    port: parseInt(DB_PORT!, 10),
    dialect: DB_ENGINE,
    dialectOptions: {
        decimalNumbers: true,
    },
    logging: false,
    define: {
        underscored: true,
    },
    pool: {
        max: 10,
        min: 0,
        acquire: 30000,
        idle: 10000,
    },
    models: [__dirname + "/models"],
};

export const sequelize = new Sequelize(config);