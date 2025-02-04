import { loansModel } from '../models/loans.models.js'

const getAllLoans = async (req, res) => {
    try {
        const loans = await loansModel.getAllLoans()
        res.status(200).json({ ok: true, data: loans })
    } catch (error) {
        console.error('Error fetching loans:', error)
        res.status(500).json({ ok: false, msg: 'Error fetching loans' })
    }
}

const getLoanById = async (req, res) => {
    try {
        const { id } = req.params
        const loan = await loansModel.getLoanById(id)

        if (!loan) {
            return res.status(404).json({ ok: false, msg: 'Loan not found' })
        }

        res.status(200).json({ ok: true, data: loan })
    } catch (error) {
        console.error('Error fetching loan by ID:', error)
        res.status(500).json({ ok: false, msg: 'Error fetching loan by ID' })
    }
}

const addLoan = async (req, res) => {
    try {
        const { Uid_users, date_loans, status } = req.body
        if (!Uid_users || !date_loans || !status) {
            return res.status(400).json({ ok: false, msg: 'Missing required fields' })
        }

        const newLoan = await loansModel.addLoan({ Uid_users, date_loans, status })
        res.status(201).json({ ok: true, data: newLoan })
    } catch (error) {
        console.error('Error adding loan:', error)
        res.status(500).json({ ok: false, msg: 'Error adding loan' })
    }
}

const deleteLoan = async (req, res) => {
    try {
        const { id } = req.params
        const deletedLoan = await loansModel.deleteLoan(id)

        if (!deletedLoan) {
            return res.status(404).json({ ok: false, msg: 'Loan not found' })
        }

        res.status(200).json({ ok: true, msg: 'Loan deleted successfully', data: deletedLoan })
    } catch (error) {
        console.error('Error deleting loan:', error)
        res.status(500).json({ ok: false, msg: 'Error deleting loan' })
    }
}

const updateLoan = async (req, res) => {
    try {
        const { id } = req.params
        const { Uid_users, date_loans, status } = req.body

        if (!Uid_users || !date_loans || !status) {
            return res.status(400).json({ ok: false, msg: 'Missing required fields' })
        }

        const updatedLoan = await loansModel.updateLoan(id, { Uid_users, date_loans, status })

        if (!updatedLoan) {
            return res.status(404).json({ ok: false, msg: 'Loan not found' })
        }

        res.status(200).json({ ok: true, msg: 'Loan updated successfully', data: updatedLoan })
    } catch (error) {
        console.error('Error updating loan:', error)
        res.status(500).json({ ok: false, msg: 'Error updating loan' })
    }
}

export const loansControllers = { getAllLoans, getLoanById, addLoan, deleteLoan, updateLoan }
