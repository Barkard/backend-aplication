import { pool } from '../database/db.js';

export const getAllBooks = async () => {
    const query = 'SELECT * FROM books'; // Cambiar "books" por el nombre real de la tabla en tu DB
    try {
        const result = await pool.query(query);
        return result.rows;
    } catch (error) {
        console.error("Error fetching books:", error);
        throw error;
    }
};

export const getBookById = async (id) => {
    const query = 'SELECT * FROM books WHERE id_book = $1';
    try {
        const result = await pool.query(query, [id]);
        return result.rows[0];
    } catch (error) {
        console.error("Error fetching book by ID:", error);
        throw error;
    }
};

export const createBook = async (book) => {
    const { id_category_book, id_loans, id_lot, cota_book, name, description, editorial, autor, available_quantity } = book;
    const query = `
        INSERT INTO books (id_category_book, id_loans, id_lot, cota_book, name, description, editorial, autor, available_quantity, created_at, updated_at)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, NOW(), NOW())
        RETURNING *`;
    try {
        const result = await pool.query(query, [id_category_book, id_loans, id_lot, cota_book, name, description, editorial, autor, available_quantity]);
        return result.rows[0];
    } catch (error) {
        console.error("Error creating book:", error);
        throw error;
    }
};

export const updateBook = async (id, book) => {
    const { id_category_book, id_loans, id_lot, cota_book, name, description, editorial, autor, available_quantity } = book;
    const query = `
        UPDATE books
        SET id_category_book = $1, id_loans = $2, id_lot = $3, cota_book = $4, name = $5, description = $6, editorial = $7, autor = $8, available_quantity = $9, updated_at = NOW()
        WHERE id_book = $10
        RETURNING *`;
    try {
        const result = await pool.query(query, [id_category_book, id_loans, id_lot, cota_book, name, description, editorial, autor, available_quantity, id]);
        return result.rows[0];
    } catch (error) {
        console.error("Error updating book:", error);
        throw error;
    }
};

export const deleteBook = async (id) => {
    const query = 'DELETE FROM books WHERE id_book = $1 RETURNING *';
    try {
        const result = await pool.query(query, [id]);
        return result.rows[0];
    } catch (error) {
        console.error("Error deleting book:", error);
        throw error;
    }
};
