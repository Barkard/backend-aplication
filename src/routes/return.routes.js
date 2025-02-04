import { Router } from 'express'
import { createReturn, getReturn } from '../controllers/return.controllers.js'

const router = Router()

router.post('/', createReturn)
router.get('/:loanId', getReturn)

export default router
