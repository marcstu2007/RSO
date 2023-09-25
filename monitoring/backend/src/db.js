const {createPool} = require('mysql2/promise');

const pool = createPool({
    host: 'mysql',        // Cambia esto al host de tu base de datos
    // host: 'localhost',        // Cambia esto al host de tu base de datos
    user: 'root',       // Cambia esto a tu nombre de usuario de MySQL
    // port: 3320,
    port: 3306,
    password: '201122934', // Cambia esto a tu contraseña de MySQL
    database: 'dbProyecto', // Cambia esto a tu base de datos
    // waitForConnections: true,
    // connectionLimit: 10, // Establece el número máximo de conexiones en el pool
    // queueLimit: 0
  });

  module.exports = pool;