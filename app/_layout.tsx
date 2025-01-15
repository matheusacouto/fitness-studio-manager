import { SQLiteProvider } from "expo-sqlite";
import { Slot } from "expo-router";

export default function RootLayout() {
  return (
    <SQLiteProvider databaseName="localDB.db">
      <Slot />
    </SQLiteProvider>
  );
}
