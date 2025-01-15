import { pool } from "../database/db.js"; // Conexión con la base de datos

// Obtener todos los lotes
const getAllLots = async () => {
  const result = await pool.query("SELECT * FROM lot");
  return result.rows;
};

// Obtener un lote por ID
const getLotById = async (id) => {
  const result = await pool.query("SELECT * FROM lot WHERE id_lot = $1", [id]);
  return result.rows[0];
};

// Crear un nuevo lote
const createLot = async (lot) => {
  const { library_name, location, current_quantity } = lot;
  const result = await pool.query(
    `INSERT INTO lot (library_name, location, current_quantity) 
    VALUES ($1, $2, $3) RETURNING *`,
    [library_name, location, current_quantity]
  );
  return result.rows[0];
};

// Actualizar un lote
const updateLot = async (id, lot) => {
  const { library_name, location, current_quantity } = lot;
  const result = await pool.query(
    `UPDATE lot SET library_name = $1, location = $2, current_quantity = $3 WHERE id_lot = $4 RETURNING *`,
    [library_name, location, current_quantity, id]
  );
  return result.rows[0];
};

// Eliminar un lote
const deleteLot = async (id) => {
  await pool.query("DELETE FROM lot WHERE id_lot = $1", [id]);
};

export { getAllLots, getLotById, createLot, updateLot, deleteLot };
