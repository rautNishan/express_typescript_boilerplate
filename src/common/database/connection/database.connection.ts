import { DataSource } from "typeorm";
import databaseConfig from "../config/database.config";
import { DatabaseException } from "../../exceptions/database.exception";

export class DBConnection {
  private static dataSource: DataSource;

  public static async connection() {
    console.log("Trying to connect....");
    if (!DBConnection.dataSource) {
      DBConnection.dataSource = new DataSource({
        type: "postgres",
        host: databaseConfig.host,
        port: Number(databaseConfig.port) || 5432,
        username: databaseConfig.username,
        password: databaseConfig.password,
        database: databaseConfig.database,
        logging: databaseConfig.logger === "true",
        entities: ["./src/**/*.entity{.ts,.js}"],
        migrations: ["./src/database/migrations/*{.ts,.js}"],
      });
    }
    try {
      await this.dataSource.initialize();
      console.log("Database Connected Successfully.....");
    } catch (error: any) {
      console.log("Failed to connect to database: ", error);
      throw error;
    }
  }

  public static getConnection(): DataSource {
    if (!DBConnection.dataSource) {
      throw new DatabaseException("Database is not even connected");
    }
    return DBConnection.dataSource;
  }

  public static async closeConnection() {
    if (DBConnection.dataSource && DBConnection.dataSource.isInitialized) {
      try {
        await DBConnection.dataSource.destroy();
        console.log("Database Connection Closed Successfully");
      } catch (error) {
        console.log("Something went wrong: ", error);
        throw error;
      }
    }
  }
}
