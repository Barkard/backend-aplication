import { query } from 'express'
import { returnModel } from '../models/return.models.js'

export const createReturn = async (req, res) => {
  const { loanId, returnDate } = req.body

  if (!loanId || !returnDate) {
    return res.status(400).json({ message: 'Loan ID and return date are required' })
  }

  try {
    const newReturn = await returnModel.addReturn(loanId, returnDate)
    res.status(201).json(newReturn)
  } catch (error) {
    res.status(500).json({ message: 'Error adding return: ' + error.message })
  }
}

export const getReturn = async (req, res) => {
  const { loanId } = req.params

  try {
    const returnData = await returnModel.getReturnByLoanId(loanId)
    if (!returnData) {
      return res.status(404).json({ message: 'Return not found' })
    }
    res.status(200).json(returnData)
  } catch (error) {
    res.status(500).json({ message: 'Error fetching return: ' + error.message })
  }
}
