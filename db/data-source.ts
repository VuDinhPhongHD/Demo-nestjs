import { Pet } from "src/pets/entities/pet.entity";
import { DataSource, DataSourceOptions } from 'typeorm';
import * as dotenv from 'dotenv';
dotenv.config();
export const dataSourceOption: DataSourceOptions={
    type: 'postgres',
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT),
    password: process.env.DATABASE_PASSWORD,
    username: process.env.DATABASE_USERNAME,
    entities: ['dist/**/*.entity.js'],
    database: process.env.DATABASE_NAME,
    synchronize: false,
    logging: true,
    migrations:['dist/db/migrations/*.js'],
}

const dataSouce = new DataSource(dataSourceOption);
export default dataSouce;