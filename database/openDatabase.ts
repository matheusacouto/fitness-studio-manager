import { type SQLiteDatabase } from "expo-sqlite";

/**
 * Opens the database and creates all necessary tables.
 *
 * @param {SQLiteDatabase} database The database to open.
 */
export async function openDatabase(database: SQLiteDatabase) {
  // Create the classes table
  await database.execAsync(`
    CREATE TABLE IF NOT EXISTS classes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      date DATE NOT NULL,
      start_time TIME NOT NULL,
      end_time TIME NOT NULL,
      max_quantity TINYINT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME,
      deleted_at DATETIME
    );
  `);

  // Create the clients table
  await database.execAsync(`
    CREATE TABLE IF NOT EXISTS clients (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      phone VARCHAR(20) NOT NULL,
      email VARCHAR(255) UNIQUE NOT NULL,
      plan INT CHECK (plan IN (2, 3, 4)),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP,
      deleted_at TIMESTAMP
    );
  `);

  // Create the workdays table
  await database.execAsync(`
    CREATE TABLE IF NOT EXISTS workdays (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      working BOOLEAN NOT NULL,
      day VARCHAR(20) UNIQUE NOT NULL, 
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME,
      deleted_at DATETIME
    );
  `);

  // Create the class_days table
  await database.execAsync(`
    CREATE TABLE IF NOT EXISTS class_days (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      class_id INT REFERENCES classes(id) ON DELETE CASCADE,
      day_id INT REFERENCES workdays(id) ON DELETE CASCADE,
      deleted_at DATETIME
    );
  `);

  await database.execAsync(`
    CREATE TABLE enrollments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    client_id INT REFERENCES clients(id) ON DELETE CASCADE,
    class_id INT REFERENCES classes(id) ON DELETE CASCADE,
    day_id INT REFERENCES workdays(id) ON DELETE CASCADE
  );
  `);
}
