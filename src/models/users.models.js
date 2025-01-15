import { pool } from '../database/db.js'; // Asegúrate de que el pool de conexiones esté configurado

// Obtener todos los usuarios
export const getAllUsers = async () => {
  const result = await pool.query('SELECT * FROM users');
  return result.rows;
};

// Obtener un usuario por ID
export const getUserById = async (id) => {
  try {
    const result = await pool.query('SELECT * FROM users WHERE id_user = $1', [id]);
    return result.rows[0];
  } catch (error) {
    console.error('Error al obtener el usuario por ID:', error);
    throw error;
  }
};

// Crear un nuevo usuario
export const createUser = async (user) => {
  const {
    name,
    lastname,
    id_card,
    email,
    password,
    birthdate,
    registration_date,
    is_active,
  } = user;

  const result = await pool.query(
    `INSERT INTO users (name, lastname, id_card, email, password, birthdate, registration_date, is_active) 
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
    [name, lastname, id_card, email, password, birthdate, registration_date, is_active]
  );
  return result.rows[0];
};

// Actualizar un usuario
export const updateUser = async (id, userData) => {
  const {
    name, lastname, id_card, email, password, birthdate, registration_date, is_active
  } = userData;
  try {
    const result = await pool.query(
      'UPDATE users SET name = $1, lastname = $2, id_card = $3, email = $4, password = $5, birthdate = $6, registration_date = $7, is_active = $8, updated_at = NOW() WHERE id_user = $9 RETURNING *',
      [name, lastname, id_card, email, password, birthdate, registration_date, is_active, id]
    );
    return result.rows[0];
  } catch (error) {
    console.error('Error al actualizar el usuario:', error);
    throw error;
  }
};

// Eliminar un usuario
export const deleteUser = async (id) => {
  try {
    const result = await pool.query('DELETE FROM users WHERE id_user = $1 RETURNING *', [id]);
    return result.rows[0];
  } catch (error) {
    console.error('Error al eliminar el usuario:', error);
    throw error;
  }
};

// Obtener un usuario por email (para login)
export const getUserByEmail = async (email) => {
  try {
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    return result.rows[0];
  } catch (error) {
    console.error('Error al obtener el usuario por email:', error);
    throw error;
  }
};
