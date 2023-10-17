import mysqlConnection from'mysql2/promise';

// Configuración de la conexión a la base de datos
const properties = {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'noelia-bahle'
};
export const pool = mysqlConnection.createPool(properties);