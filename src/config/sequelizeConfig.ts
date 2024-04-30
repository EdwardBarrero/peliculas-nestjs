// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();
import { SequelizeModuleOptions } from '@nestjs/sequelize';

const { PG_HOST, PG_PORT, PG_USER, PG_PASSWORD, PG_DATABASE } = process.env;

export const sequelizeConfig: SequelizeModuleOptions = {
  dialect: 'postgres',
  host: PG_HOST,
  port: PG_PORT ? parseInt(PG_PORT) : 5432,
  username: PG_USER,
  password: PG_PASSWORD,
  database: PG_DATABASE,
  models: [],
  synchronize: true,
  autoLoadModels: true,
  logging: false,
};
