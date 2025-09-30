import type { Database } from "better-sqlite3";

export const migrations: { name: string; up: (db: Database) => void }[] = [
  {
    name: "create_todos_table",
    up: (db: Database) => {
      db.exec(
        "CREATE TABLE todos (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, description TEXT, dueDate TEXT)"
      );
    },
  },
];

export const migrate = async (db: Database) => {
  db.prepare(
    "CREATE TABLE IF NOT EXISTS migrations (name TEXT PRIMARY KEY)"
  ).run();

  for (const migration of migrations) {
    const migrationExists = await db
      .prepare("SELECT name FROM migrations WHERE name = ?")
      .get(migration.name);

    if (migrationExists) continue;

    migration.up(db);
  }
};
