import { query } from 'express'
import { pool } from '../database/db.js'

const updateUserProfile = async (email, { name, lastname, id_card, email: newEmail, birthdate }) => {
  if (newEmail === email) {
    const query = `
      UPDATE "users"
      SET name = $1, lastname = $2, id_card = $3, birthdate = $4, updated_at = NOW()
      WHERE email = $5
      RETURNING *;
    `
    const values = [name, lastname, id_card, birthdate, email]
    try {
      const result = await pool.query(query, values)
      return result.rows[0]
    } catch (error) {
      throw new Error('Error updating user profile: ' + error.message);
    }
  } else {
    const query = `
      UPDATE "users"
      SET name = $1, lastname = $2, id_card = $3, email = $4, birthdate = $5, updated_at = NOW()
      WHERE email = $6
      RETURNING *;
    `
    const values = [name, lastname, id_card, newEmail, birthdate, email]
    try {
      const result = await pool.query(query, values)
      return result.rows[0]
    } catch (error) {
      throw new Error('Error updating user profile: ' + error.message)
    }
  }
}

const getUserProfile = async (email) => {
  const query = 'SELECT Uid_users, name, lastname, id_card, email, birthdate FROM "users" WHERE email = $1;'
  const values = [email]

  try {
    const result = await pool.query(query, values)
    return result.rows[0]
  } catch (error) {
    throw new Error('Error fetching user profile: ' + error.message)
  }
}

export const userProfileModel = { updateUserProfile, getUserProfile }
