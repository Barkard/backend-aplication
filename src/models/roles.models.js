import { query } from 'express'
import {pool} from '../database/db.js'

const getAllRoles = async() => {
    const query = `
        SELECT id_role, name, description, created_at, updated_at
        FROM role;
    `
    const result = await pool.query(query)
    return result.rows
}

const getRolesById = async (id) => {
    const query = `
        SELECT id_role, name, description
        FROM role
        WHERE id_role = $1
    `
    const { rows } = await pool.query(query, [id])
    return rows[0]
}

const addRole = async ({name, description}) => {
    const query = {
        text: `INSERT INTO role (name, description)
        VALUES ($1, $2)
        RETURNING id_role, name, description
        `,
        values: [name, description]
    }

    const {rows} = await pool.query(query)
    return rows [0]
}

const findOneByRole = async(name) => {
    const query = {
        text: `
        SELECT * FROM role
        WHERE name = $1
        `,
        values: [name]
    }
    const { rows } = await pool.query(query)
    return rows[0]
}

const updateRole = async (id, { name, description }) => {
    const query = `
        UPDATE role
        SET name = $1, description = $2
        WHERE id_role = $3
        RETURNING *
    `
    const values = [name, description, id]
    const { rows } = await pool.query(query, values)
    return rows[0]
}

const deleteRole = async (id) => {
    const query = 'DELETE FROM role WHERE id_role = $1 RETURNING *'
    const {rows} = await pool.query(query, [id])
    return rows[0]
}

export const rolesModel = { getAllRoles, getRolesById, addRole, findOneByRole, updateRole, deleteRole }