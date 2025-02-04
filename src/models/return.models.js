import { pool } from '../database/db.js'


const addReturn = async (loanId, returnDate) => {
  const query = `
    INSERT INTO return (id_loans, date_return)
    VALUES ($1, $2)
    RETURNING *;
  `
  const values = [loanId, returnDate]
  
  try {
    const result = await pool.query(query, values)
    return result.rows[0]
  } catch (error) {
    throw new Error('Error adding return: ' + error.message)
  }
}

const getReturnByLoanId = async (loanId) => {
  const query = 'SELECT * FROM return WHERE id_loans = $1;'
  const values = [loanId]

  try {
    const result = await pool.query(query, values)
    return result.rows[0]
  } catch (error) {
    throw new Error('Error fetching return by loan ID: ' + error.message)
  }
}

export const returnModel = { addReturn, getReturnByLoanId }