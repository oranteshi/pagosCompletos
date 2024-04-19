import dotenv from 'dotenv';
import mysql from 'mysql2/promise';

dotenv.config();

const config = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
}

const pool = mysql.createPool(config);

export async function query(sql: string, params: any[]) {
    try {
        const conect = await pool.getConnection();
        console.log('Conexion a realizada a la BD');
        const result = await conect.execute(sql, params);
        conect.release();
        return result;
    } catch ( error ) {
        console.log('Error al conectar la BD', error);
        return null;
    }
}