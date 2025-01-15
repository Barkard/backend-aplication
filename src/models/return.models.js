import { pool } from "../database/db.js"; // Conexión con la base de datos

// Obtener todas las devoluciones
const getAllReturns = async () => {
  const result = await pool.query("SELECT * FROM return");
  return result.rows;
};

// Obtener una devolución por ID de préstamo
const getReturnByLoanId = async (id) => {
  const result = await pool.query("SELECT * FROM return WHERE id_loans = $1", [id]);
  return result.rows[0];
};

// Crear una nueva devolución
const createReturn = async (returnData) => {
  const { id_loans, date_return } = returnData;
  const result = await pool.query(
    `INSERT INTO return (id_loans, date_return) 
    VALUES ($1, $2) RETURNING *`,
    [id_loans, date_return]
  );
  return result.rows[0];
};

// Actualizar una devolución
const updateReturn = async (id, returnData) => {
  const { date_return } = returnData;
  const result = await pool.query(
    `UPDATE return SET date_return = $1 WHERE id_loans = $2 RETURNING *`,
    [date_return, id]
  );
  return result.rows[0];
};

// Eliminar una devolución
const deleteReturn = async (id) => {
  await pool.query("DELETE FROM return WHERE id_loans = $1", [id]);
};

export { getAllReturns, getReturnByLoanId, createReturn, updateReturn, deleteReturn };
