import { config as dotenv } from "dotenv";
dotenv();

export default {
  port: process.env.PORT || 4000,
  db: {
    user: process.env.DB_USER || "postgres",
    password: process.env.DB_PASSWORD || "123",
    host: process.env.DB_HOST || "localhost",
    port: Number(process.env.DB_PORT) || 5432,
    database: process.env.DB_DATABASE || "typescriptduties",
  },
};
