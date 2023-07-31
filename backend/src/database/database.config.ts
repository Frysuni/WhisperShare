import { from } from 'env-var';
import { resolve } from 'path';
import { DataSourceOptions } from 'typeorm';
import { NamingStrategy } from './database.naming-strategy';

export const DatabaseConfig = (): { database: DataSourceOptions } => {
  const env = from(process.env);

  return {
    database: {
      type: 'mariadb',
      entities: [resolve(__dirname, '../', './**/*.entity.{js,ts}')],
      synchronize: process.env.NODE_ENV === 'dev',
      namingStrategy: new NamingStrategy,
      host:     env.get('DB_HOST')    .required().asString(),
      port:     env.get('DB_PORT')    .required().asPortNumber(),
      username: env.get('DB_USERNAME').required().asString(),
      password: env.get('DB_PASSWORD').required().asString(),
      database: env.get('DB_DATABASE').required().asString(),
    },
  };
};
