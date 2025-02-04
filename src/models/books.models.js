import { query } from 'express'
import { pool } from '../database/db.js'

const getAllBooks = async () => {
    const query = `
        SELECT id_book, id_category_book, id_loans, cota_book, name, description, editorial, autor
        FROM books;
    `
    const { rows } = await pool.query(query)
    return rows
}

const getBooksByCategory = async (id_category_book) => {
    const query = `
        SELECT id_book, id_category_book, id_loans, cota_book, name, description, editorial, autor
        FROM books
        WHERE id_category_book = $1;
    `
    const { rows } = await pool.query(query, [id_category_book])
    return rows
}

const addBook = async ({ id_category_book, cota_book, name, description, editorial, autor }) => {
    const query = `
        INSERT INTO books (id_category_book, id_loans, cota_book, name, description, editorial, autor)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        RETURNING *;
    `
    const values = [id_category_book, id_loans, cota_book, name, description, editorial, autor]
    const { rows } = await pool.query(query, values)
    return rows[0]
}

const deleteBook = async (id) => {
    const query = `
        DELETE FROM books
        WHERE id_book = $1
        RETURNING *;
    `
    const { rows } = await pool.query(query, [id])
    return rows[0]
}

const updateBook = async (id, { id_category_book, id_loans, cota_book, name, description, editorial, autor }) => {
    const query = `
        UPDATE books
        SET id_category_book = $1, id_loans = $2, cota_book = $3, name = $4, description = $5, editorial = $6, autor = $7
        WHERE id_book = $8
        RETURNING *;
    `
    const values = [id_category_book, id_loans, cota_book, name, description, editorial, autor, id]
    const { rows } = await pool.query(query, values)
    return rows[0]
}

export const booksModel = { getAllBooks, getBooksByCategory, addBook, deleteBook, updateBook }
