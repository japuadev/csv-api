import sqlite3 from "sqlite3";
import path from "path";
const dbPath = path.resolve(__dirname, "./database.db");

export const connection = () => {
  const database = new sqlite3.Database(dbPath);
  return database;
};

export const queryExecute = async (query: string, params?: any[]) => {
  let database = await connection();
  return new Promise<any[]>((resolve, reject) => {
    database.all(query, params, (error, rows) => {
      if (error) {
        reject(error);
      }
      resolve(rows);
    });
  }).finally(() => {
    database.close();
  });
};
