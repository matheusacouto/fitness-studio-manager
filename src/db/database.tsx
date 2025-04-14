import * as SQLite from 'expo-sqlite'

import { useSQLiteContext } from 'expo-sqlite'
import { useEffect } from 'react'

// Migrações
const migrations = [
  {
    version: 2,
    script: async (db: SQLite.SQLiteDatabase) => {
      await db.execAsync(`
        CREATE TABLE teacher (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT NOT NULL,
          email TEXT NOT NULL UNIQUE,
          phone TEXT
        );
      `)
    },
  },
  {
    version: 3,
    script: async (db: SQLite.SQLiteDatabase) => {
      await db.execAsync(`
        CREATE TABLE lesson (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT NOT NULL,
          max_clients INTEGER NOT NULL,
          day_of_week TEXT NOT NULL,
          start_time TEXT NOT NULL,
          end_time TEXT NOT NULL,
          teacher_id INTEGER NOT NULL,
          FOREIGN KEY (teacher_id) REFERENCES Teacher(id)
        );
      `)
    },
  },
  {
    version: 4,
    script: async (db: SQLite.SQLiteDatabase) => {
      await db.execAsync(`
        CREATE TABLE client (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT NOT NULL,
          phone TEXT NOT NULL,
          email TEXT NOT NULL UNIQUE,
          plan TEXT NOT NULL
        );
      `)
    },
  },
  {
    version: 5,
    script: async (db: SQLite.SQLiteDatabase) => {
      await db.execAsync(`
        CREATE TABLE client_lesson (
          client_id INTEGER NOT NULL,
          lesson_id INTEGER NOT NULL,
          PRIMARY KEY (client_id, lesson_id),
          FOREIGN KEY (client_id) REFERENCES Client(id),
          FOREIGN KEY (lesson_id) REFERENCES Lessons(id)
        );
      `)
    },
  },
]

// Inicialização
const initializeDatabase = async (db) => {
  await db.execAsync(
    `CREATE TABLE IF NOT EXISTS Version (key TEXT PRIMARY KEY, value TEXT);`,
  )
  await db.execAsync(
    `INSERT OR IGNORE INTO Version (key, value) VALUES ("schema_version", "1");`,
  )
}

// Obter versão atual
const getVersion = async (db) => {
  const row = (await db.getFirstAsync(
    `SELECT value FROM Version WHERE key = "schema_version";`,
  )) as { value: string } | undefined
  return row ? parseInt(row.value, 10) : 1
}

const setVersion = async (db, version: number) => {
  await db.execAsync(
    `UPDATE Version SET value = ? WHERE key = "schema_version";`,
    [version.toString()],
  )
}

// Aplicar migrações
const applyMigrations = async (db) => {
  const currentVersion = await getVersion(db)
  for (const m of migrations) {
    if (m.version > currentVersion) {
      await m.script(db)
      await setVersion(db, m.version)
    }
  }
}
// Provider do contexto
const DatabaseInitializer = () => {
  const db = useSQLiteContext()

  useEffect(() => {
    const setup = async () => {
      await db.execAsync('PRAGMA journal_mode = WAL;') // fora da transação!
      await db.withTransactionAsync(async () => {
        await initializeDatabase(db)
        await applyMigrations(db)
      })
    }

    setup()
  }, [])

  return null
}

export default DatabaseInitializer
