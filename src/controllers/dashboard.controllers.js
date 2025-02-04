import { pool } from '../database/db.js'

const getDashboardData = async (req, res) => {
  try {
    // Consultas para obtener estadísticas
    const totalBooksQuery = 'SELECT COUNT(*) FROM books;'
    const totalUsersQuery = 'SELECT COUNT(*) FROM users;'
    const totalLoansQuery = 'SELECT COUNT(*) FROM loans WHERE status = \'active\';'
    const totalReturnsQuery = 'SELECT COUNT(*) FROM return;'

    const totalBooks = await pool.query(totalBooksQuery)
    const totalUsers = await pool.query(totalUsersQuery)
    const totalLoans = await pool.query(totalLoansQuery)
    const totalReturns = await pool.query(totalReturnsQuery)

    // Datos para el dashboard
    const dashboardData = {
      totalBooks: totalBooks.rows[0].count,
      totalUsers: totalUsers.rows[0].count,
      totalLoans: totalLoans.rows[0].count,
      totalReturns: totalReturns.rows[0].count,
    };

    // Responder con los datos del dashboard
    res.status(200).json(dashboardData)
  } catch (error) {
    console.error('Error fetching dashboard data:', error)
    res.status(500).json({ message: 'Error fetching dashboard data' })
  }
}

export const dashboardController = { getDashboardData }
