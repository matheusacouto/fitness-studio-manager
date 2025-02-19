import * as SQLite from 'react-native-sqlite-storage'

SQLite.enablePromise(true)

const initializeDatabase = async (db: SQLite.SQLiteDatabase) => {
  await db.executeSql(
    `PRAGMA journal_mode = WAL;
    CREATE TABLE IF NOT EXISTS Version (key TEXT PRIMARY KEY, value TEXT);
    `,
  )
  await db.executeSql(
    `INSERT OR IGNORE INTO Version (key, value) VALUES ("schema_version", "1");`,
  )
}

// Process start
const dbPromise = SQLite.openDatabase({
  name: 'mydatabase.db',
  location: 'default',
})

dbPromise.then(async (db) => {
  await db.transaction(async (tx) => {
    await initializeDatabase(tx)
    await applyMigrations(tx)
  })
})

// Migrations go here

const migrations = [
  {
    version: 2,
    script: async (db: SQLite.SQLiteDatabase) => {
      await db.executeSql(
        `CREATE TABLE Teacher (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT NOT NULL UNIQUE,
            phone TEXT
        );`,
      )
    },
  },
  {
    version: 3,
    script: async (db: SQLite.SQLiteDatabase) => {
      await db.executeSql(
        `CREATE TABLE Lessons (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            max_clients INTEGER NOT NULL,
            day_of_week TEXT NOT NULL,
            start_time TEXT NOT NULL,
            end_time TEXT NOT NULL,
            teacher_id INTEGER NOT NULL,
            FOREIGN KEY (teacher_id) REFERENCES Teacher(id)
        );`,
      )
    },
  },
  {
    version: 4,
    script: async (db: SQLite.SQLiteDatabase) => {
      await db.executeSql(
        `CREATE TABLE client (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            phone TEXT NOT NULL,
            email TEXT NOT NULL UNIQUE,
            plan TEXT NOT NULL,
        );`,
      )
    },
  },
  {
    version: 5,
    script: async (db: SQLite.SQLiteDatabase) => {
      await db.executeSql(
        `CREATE TABLE Client_Lesson (
            client_id INTEGER NOT NULL,
            lesson_id INTEGER NOT NULL,
            PRIMARY KEY (client_id, lesson_id),
            FOREIGN KEY (client_id) REFERENCES client(id),
            FOREIGN KEY (lesson_id) REFERENCES lesson(id),
        );`,
      )
    },
  },
]

const getDatabaseVersion = async (
  db: SQLite.SQLiteDatabase,
): Promise<number> => {
  const [result] = await db.executeSql(
    'SELECT value FROM Version WHERE key = "schema_version";',
  )
  return result.rows.length ? parseInt(result.rows.item(0).value, 10) : 1
}

const setDatabaseVersion = async (
  db: SQLite.SQLiteDatabase,
  version: number,
) => {
  await db.executeSql(
    'UPDATE Version SET value = ? WHERE key = "schema_version";',
    [version.toString()],
  )
}

const applyMigrations = async (db: SQLite.SQLiteDatabase) => {
  const currentVersion = await getDatabaseVersion(db)
  for (const migration of migrations) {
    if (migration.version > currentVersion) {
      await migration.script(db)
      await setDatabaseVersion(db, migration.version)
    }
  }
}
