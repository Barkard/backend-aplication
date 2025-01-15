import { pool } from "../database/db.js"; // Conexión con la base de datos

// Obtener todos los roles
const getAllRoles = async () => {
  const result = await pool.query("SELECT * FROM role");
  return result.rows;
};

// Obtener un rol por ID
const getRoleById = async (id) => {
  const result = await pool.query("SELECT * FROM role WHERE id_role = $1", [id]);
  return result.rows[0];
};

// Crear un nuevo rol
const createRole = async (role) => {
  const { name, description } = role;
  const result = await pool.query(
    `INSERT INTO role (name, description) 
    VALUES ($1, $2) RETURNING *`,
    [name, description]
  );
  return result.rows[0];
};

// Actualizar un rol
const updateRole = async (id, role) => {
  const { name, description } = role;
  const result = await pool.query(
    `UPDATE role SET name = $1, description = $2 WHERE id_role = $3 RETURNING *`,
    [name, description, id]
  );
  return result.rows[0];
};

// Eliminar un rol
const deleteRole = async (id) => {
  await pool.query("DELETE FROM role WHERE id_role = $1", [id]);
};

export { getAllRoles, getRoleById, createRole, updateRole, deleteRole };
