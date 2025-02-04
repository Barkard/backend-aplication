import { query } from 'express'
import { pool } from "../database/db.js"

const getAllCategories = async () => {
    const query = "SELECT * FROM category_book"
    const { rows } = await pool.query(query)
    return rows
}

const getCategoryById = async (id_category_book) => {
    const query = "SELECT * FROM category_book WHERE id_category_book = $1"
    const { rows } = await pool.query(query, [id_category_book])
    return rows[0]
}

const addCategory = async ({ category_name, description_category }) => {
    const query = `
        INSERT INTO category_book (category_name, description_category)
        VALUES ($1, $2)
        RETURNING *`
    const values = [category_name, description_category]
    const { rows } = await pool.query(query, values)
    return rows[0]
}

const updateCategory = async (id_category_book, { category_name, description_category }) => {
    const query = `
        UPDATE category_book
        SET category_name = $1, description_category = $2
        WHERE id_category_book = $3
        RETURNING *`
    const values = [category_name, description_category, id_category_book]
    const { rows } = await pool.query(query, values)
    return rows[0]
}

const deleteCategory = async (id_category_book) => {
    const query = "DELETE FROM category_book WHERE id_category_book = $1 RETURNING *"
    const { rows } = await pool.query(query, [id_category_book])
    return rows[0]
}

export default { getAllCategories, getCategoryById, addCategory, updateCategory, deleteCategory }
