import { Router } from 'express'
import { loansControllers } from '../controllers/loans.controllers.js'

const router = Router()

router.get('/', loansControllers.getAllLoans)
router.get('/:id', loansControllers.getLoanById)
router.post('/', loansControllers.addLoan)
router.put('/:id', loansControllers.updateLoan)
router.delete('/:id', loansControllers.deleteLoan)

export default router
