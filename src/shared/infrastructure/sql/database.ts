import betterSqlite3 from "better-sqlite3";
import { migrate } from "./migrations";

export const db = betterSqlite3("todo.db");
// db.pragma("journal_mode = WAL");

migrate(db);