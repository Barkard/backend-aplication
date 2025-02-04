import { query } from 'express'
import {pool} from '../database/db.js'

const create = async ({name, lastname, id_card, email, password, birthdate}) => {
    const query = {
        text: `INSERT INTO users (name, lastname, id_card, email, password, birthdate)
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING name, lastname, id_card, email, birthdate, uid_users
        `,
        values: [name, lastname, id_card, email, password, birthdate]
    }

    const {rows} = await pool.query(query)
    return rows [0]
}

const findOneByEmail = async(email) => {
    const query = {
        text: `
        SELECT * FROM users
        WHERE email = $1
        `,
        values: [email]
    }
    const {rows} = await pool.query(query)
    return rows[0]
}

const updatePasswordByEmail = async (email, password) => {
    const query = {
        text: 'Update users set password = $1 where email = $2',
        values: [password, email],
    }

    await pool.query(query)
}

const getAllUsers = async() => {
    const query = `
        SELECT uid_users, id_role, name, lastname, id_card, email, password, birthdate, registration_date, created_at, updated_at, is_active
        FROM users;
    `
    const result = await pool.query(query)
    return result.rows
}

const getUsersById = async (id) => {
    const query = `
        SELECT uid_users, id_role, name, lastname, id_card, email, birthdate, is_active
        FROM users
        WHERE uid_users = $1
    `
    const { rows } = await pool.query(query, [id])
    return rows[0]
}

const updateUser = async (id, { id_role, name, lastname, id_card, email, birthdate, is_active }) => {
    const query = `
        UPDATE users
        SET id_role = $1, name = $2, lastname = $3, id_card = $4, email = $5, birthdate = $6, updated_at = NOW(), is_active = $7
        WHERE uid_users = $8
        RETURNING *
    `
    const values = [id_role, name, lastname, id_card, email, birthdate, is_active, id]
    const { rows } = await pool.query(query, values)
    return rows[0]
}

const deleteUser = async (id) => {
    const query = 'DELETE FROM users WHERE uid_users = $1 RETURNING *'
    const {rows} = await pool.query(query, [id])
    return rows[0]
}

export const usersModel = { create,findOneByEmail, updatePasswordByEmail, getAllUsers, getUsersById, updateUser, deleteUser }
