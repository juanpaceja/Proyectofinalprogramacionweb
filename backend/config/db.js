const mysql = require('mysql2');
const conexion= mysql.createConnection({
 host: 'localhost',  
 user: 'root',
 password: 'holasoyXD1',
 database: 'syscalif'
});
conexion.connect((err) => {
 if (err) {
    console.error('Error de conexión a MySQL:', err);
    return;
 }
 console.log('Conectado a MySQL.');
});
module.exports = conexion

//ola123