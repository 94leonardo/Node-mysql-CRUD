import { createPool } from "mysql2/promise";

// Instanciar un objeto en una constante
export const pool = createPool({
  // Indicar los datos para la base de datos
  host: "localhost",
  user: "root",
  password: "54321",
  database: "taskdb",
  port: 3306,
});

// Función para probar la conexión
async function testConnection() {
  try {
    const connection = await pool.getConnection();
    console.log("Conexión exitosa a la base de datos");
    connection.release();
  } catch (err) {
    console.error("Error al conectar a la base de datos:", err);
  }
}

// Llamar a la función para probar la conexión
testConnection();
