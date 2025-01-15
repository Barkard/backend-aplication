import { pool } from "../database/db.js"; // Conexión con la base de datos

// Obtener todos los préstamos
const getAllLoans = async () => {
  const result = await pool.query("SELECT * FROM loans");
  return result.rows;
};

// Obtener un préstamo por ID
const getLoanById = async (id) => {
  const result = await pool.query("SELECT * FROM loans WHERE id_loan = $1", [id]);
  return result.rows[0];
};

// Crear un nuevo préstamo
const createLoan = async (loan) => {
  const { id_user, id_book, loan_date, return_date } = loan;
  const result = await pool.query(
    `INSERT INTO loans (id_user, id_book, loan_date, return_date) 
    VALUES ($1, $2, $3, $4) RETURNING *`,
    [id_user, id_book, loan_date, return_date]
  );
  return result.rows[0];
};

// Actualizar un préstamo
const updateLoan = async (id, loan) => {
  const { id_user, id_book, loan_date, return_date } = loan;
  const result = await pool.query(
    `UPDATE loans SET id_user = $1, id_book = $2, loan_date = $3, return_date = $4 
    WHERE id_loan = $5 RETURNING *`,
    [id_user, id_book, loan_date, return_date, id]
  );
  return result.rows[0];
};

// Eliminar un préstamo
const deleteLoan = async (id) => {
  await pool.query("DELETE FROM loans WHERE id_loan = $1", [id]);
};

export { getAllLoans, getLoanById, createLoan, updateLoan, deleteLoan };
