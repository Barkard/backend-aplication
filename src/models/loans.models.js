import { query } from 'express'
import { pool } from '../database/db.js'

const getAllLoans = async () => {
    const query = `
        SELECT id_loans, Uid_users, date_loans, status, created_at, updated_at
        FROM loans;
    `
    const { rows } = await pool.query(query)
    return rows
}

const getLoanById = async (id) => {
    const query = `
        SELECT id_loans, Uid_users, date_loans, status, created_at, updated_at
        FROM loans
        WHERE id_loans = $1;
    `
    const { rows } = await pool.query(query, [id])
    return rows[0]
}

const addLoan = async ({ Uid_users, date_loans, status }) => {
    const query = `
        INSERT INTO loans (Uid_users, date_loans, status)
        VALUES ($1, $2, $3)
        RETURNING *;
    `
    const values = [Uid_users, date_loans, status]
    const { rows } = await pool.query(query, values)
    return rows[0]
}

const deleteLoan = async (id) => {
    const query = `
        DELETE FROM loans
        WHERE id_loans = $1
        RETURNING *;
    `
    const { rows } = await pool.query(query, [id])
    return rows[0]
}

const updateLoan = async (id, { Uid_users, date_loans, status }) => {
    const query = `
        UPDATE loans
        SET Uid_users = $1, date_loans = $2, status = $3
        WHERE id_loans = $4
        RETURNING *;
    `
    const values = [Uid_users, date_loans, status, id]
    const { rows } = await pool.query(query, values)
    return rows[0]
}

export const loansModel = { getAllLoans, getLoanById, addLoan, deleteLoan, updateLoan }
