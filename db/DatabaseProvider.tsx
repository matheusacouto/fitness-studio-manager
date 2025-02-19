import React, { createContext, useContext, useEffect, useState } from 'react'
import * as SQLite from 'expo-sqlite'

// Tipo para o contexto
type DatabaseContextType = {
  db: SQLite.SQLiteDatabase | null
  isReady: boolean
}

// Criando o contexto
const DatabaseContext = createContext<DatabaseContextType>({
  db: null,
  isReady: false,
})

// Hook para usar o contexto
export const useDatabase = () => useContext(DatabaseContext)

// Migrações
const migrations = [
  {
    version: 2,
    script: async (db: SQLite.SQLiteDatabase) => {
      await db.execAsync(`
        CREATE TABLE Teacher (
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
        CREATE TABLE Lessons (
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
        CREATE TABLE Client (
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
        CREATE TABLE Client_Lesson (
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
const initializeDatabase = async (db: SQLite.SQLiteDatabase) => {
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS Version (key TEXT PRIMARY KEY, value TEXT);
  `)

  await db.execAsync(`
    INSERT OR IGNORE INTO Version (key, value) VALUES ("schema_version", "1");
  `)
}

// Obter versão atual
const getDatabaseVersion = async (db: SQLite.SQLiteDatabase): Promise<number> => {
  const result = await db.getFirstAsync<{ value: string }>(
    'SELECT value FROM Version WHERE key = "schema_version";'
  )
  return result ? parseInt(result.value, 10) : 1
}

// Atualizar versão
const setDatabaseVersion = async (db: SQLite.SQLiteDatabase, version: number) => {
  await db.execAsync(
    'UPDATE Version SET value = ? WHERE key = "schema_version";',
    [version.toString()]
  )
}

// Aplicar migrações
const applyMigrations = async (db: SQLite.SQLiteDatabase) => {
  const currentVersion = await getDatabaseVersion(db)

  for (const migration of migrations) {
    if (migration.version > currentVersion) {
      await migration.script(db)
      await setDatabaseVersion(db, migration.version)
    }
  }
}

// Provider do contexto
export const DatabaseProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [db, setDb] = useState<SQLite.SQLiteDatabase | null>(null)
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    const setupDatabase = async () => {
      try {
        const database = await SQLite.openDatabaseAsync('database.db')

        await database.execAsync('PRAGMA journal_mode = WAL;')
        
        await database.withTransactionAsync(async () => {
          await initializeDatabase(database)
          await applyMigrations(database)
        })

        setDb(database)
        setIsReady(true)
      } catch (error) {
        console.error('Erro ao iniciar o banco de dados:', error)
      }
    }

    setupDatabase()
  }, [])

  return (
    <DatabaseContext.Provider value={{ db, isReady }}>
      {children}
    </DatabaseContext.Provider>
  )
}
