import sqlite3 from 'sqlite3';
import path from 'path';
const dbPath = path.resolve(__dirname, "./database.db")

export const connection = () => {
    const db = new sqlite3.Database(dbPath);
    return db
}

export const queryExecute = async (query: string, rows: string[]) => {
    const db = connection();
    db.all(query, rows);
}
