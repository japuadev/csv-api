import { Database } from 'sqlite3';

export const openConnection = () => {
    let database = new Database('database.db');
    return database
}

