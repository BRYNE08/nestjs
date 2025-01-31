import { join } from "path";
import { DataSource, DataSourceOptions } from "typeorm";
import { config } from "dotenv";

config()

export const dataSourceOptions: DataSourceOptions = {
    type: 'mysql',
    host: process.env.DB_HOST,
    port: +process.env.DB_PORT,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [join(process.cwd(), 'dist/**/*.entity.js')],
    migrations: ['dist/db/migrations/*.js'],
  }


  const dataSource = new DataSource(dataSourceOptions);

  export default dataSource;
