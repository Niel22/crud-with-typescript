import dotenv from 'dotenv';
import { Dialect } from 'sequelize';

dotenv.config();

interface DatabaseConfig {
  host: string;
  port: number;
  user: string;
  password: string;
  name: string;
  dialect: Dialect;
}

const databaseConfig: DatabaseConfig = {
    host: process.env.DB_HOST ?? '',
    dialect: "mysql",
    port: parseInt(process.env.DB_PORT!) ?? 3306,
    user: process.env.DB_USER ?? '',
    password: process.env.DB_PASS ?? '',
    name: process.env.DB_NAME ?? '',
}

export default databaseConfig;