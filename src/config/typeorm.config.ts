import { DataSource, DataSourceOptions } from 'typeorm';
import * as path from 'path';
import 'dotenv/config';

const baseConfig = {
  type: process.env.DB_TYPE,
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [path.join(__dirname, '/../**/*.entity{.ts,.js}')],
  migrations: [path.join(__dirname, '../migrations/*{.ts,.js}')],
  retryAttempts: 5,
  retryDelay: 2000,
  // migraionsRun: true
};

// Export configuration for NestJS
export const typeOrmConfig = {
  ...baseConfig,
  synchronize: false,
};

// Export configuration for TypeORM CLI
export const dataSourceConfig = new DataSource(baseConfig as DataSourceOptions);
