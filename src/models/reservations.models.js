import { query } from 'express'
import { pool } from '../database/db.js'

const getAllReservations = async () => {
    const query = `
        SELECT id_reservation, Uid_users, id_book, reservation_date, status, created_at, updated_at
        FROM reservations;
    `
    const { rows } = await pool.query(query)
    return rows
}

const getReservationsByUser = async (Uid_users) => {
    const query = `
        SELECT id_reservation, Uid_users, id_book, reservation_date, status, created_at, updated_at
        FROM reservations
        WHERE Uid_users = $1;
    `
    const { rows } = await pool.query(query, [Uid_users])
    return rows
}

const addReservation = async ({ Uid_users, id_book, reservation_date, status }) => {
    const query = `
        INSERT INTO reservations (Uid_users, id_book, reservation_date, status)
        VALUES ($1, $2, $3, $4)
        RETURNING *;
    `
    const values = [Uid_users, id_book, reservation_date, status]
    const { rows } = await pool.query(query, values)
    return rows[0]
}

const deleteReservation = async (id) => {
    const query = `
        DELETE FROM reservations
        WHERE id_reservation = $1
        RETURNING *;
    `
    const { rows } = await pool.query(query, [id])
    return rows[0]
}


const updateReservation = async (id, { status }) => {
    const query = `
        UPDATE reservations
        SET status = $1, updated_at = NOW()
        WHERE id_reservation = $2
        RETURNING *;
    `
    const { rows } = await pool.query(query, [status, id])
    return rows[0]
}

export const reservationsModel = { getAllReservations, getReservationsByUser, addReservation, deleteReservation, updateReservation }
