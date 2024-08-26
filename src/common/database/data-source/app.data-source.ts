import { DataSource } from "typeorm";
import databaseConfig from "../config/database.config";

export const dataSource: DataSource = new DataSource({
  type: "postgres",
  host: databaseConfig.host,
  port: Number(databaseConfig.port) || 5432,
  username: databaseConfig.username,
  password: databaseConfig.password,
  database: databaseConfig.database,
  logging: databaseConfig.logger === "true",
  entities: ["./src/**/*.entity{.ts,.js}"],
  migrations: ["./src/common/database/migrations/*{.ts,.js}"],
});
