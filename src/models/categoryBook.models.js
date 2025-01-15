import { pool } from '../database/db.js';

const getAllCategories = async () => {
  const result = await pool.query('SELECT * FROM category_book');
  return result.rows;
};

const getCategoryById = async (id) => {
  const result = await pool.query('SELECT * FROM category_book WHERE id_category_book = $1', [id]);
  return result.rows[0];
};

const createCategory = async (name, description) => {
  const result = await pool.query(
    'INSERT INTO category_book (name, description) VALUES ($1, $2) RETURNING *',
    [name, description]
  );
  return result.rows[0];
};

const updateCategory = async (id, name, description) => {
  const result = await pool.query(
    'UPDATE category_book SET name = $1, description = $2 WHERE id_category_book = $3 RETURNING *',
    [name, description, id]
  );
  return result.rows[0];
};

const deleteCategory = async (id) => {
  const result = await pool.query('DELETE FROM category_book WHERE id_category_book = $1 RETURNING *', [id]);
  return result.rows[0];
};

export { getAllCategories, getCategoryById, createCategory, updateCategory, deleteCategory };
