import { pool } from '../database/db.js';

// Obtener todos los usuarios
export const getAllUsers = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM users');
        res.json(result.rows);
    } catch (error) {
        console.error('Error fetching users:', error.message);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Obtener un usuario por ID
export const getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query('SELECT * FROM users WHERE uid_users = $1', [id]);

        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json(result.rows[0]);
    } catch (error) {
        console.error('Error fetching user by ID:', error.message);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Crear un nuevo usuario
export const createUser = async (req, res) => {
    try {
        const { name, lastname, id_card, email, password, birthdate } = req.body;
        const result = await pool.query(
            `INSERT INTO users (name, lastname, id_card, email, password, birthdate, created_at, updated_at, is_active)
             VALUES ($1, $2, $3, $4, $5, $6, NOW(), NOW(), true) RETURNING *`,
            [name, lastname, id_card, email, password, birthdate]
        );

        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error('Error creating user:', error.message);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Eliminar un usuario por ID
export const deleteUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query('DELETE FROM users WHERE uid_users = $1 RETURNING *', [id]);

        if (result.rowCount === 0) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error('Error deleting user:', error.message);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Actualizar un usuario por ID
export const updateUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, lastname, id_card, email, password, birthdate } = req.body;

        const result = await pool.query(
            `UPDATE users
             SET name = $1, lastname = $2, id_card = $3, email = $4, password = $5, birthdate = $6, updated_at = NOW()
             WHERE uid_users = $7 RETURNING *`,
            [name, lastname, id_card, email, password, birthdate, id]
        );

        if (result.rowCount === 0) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json(result.rows[0]);
    } catch (error) {
        console.error('Error updating user:', error.message);
        res.status(500).json({ message: 'Internal server error' });
    }
};
