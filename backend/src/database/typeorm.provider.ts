import { config } from "dotenv";
import { DataSource } from "typeorm";
import { DatabaseConfig } from "./database.config";

config();

export default new DataSource(DatabaseConfig().database);