import { Router } from 'express'
import { reservationsControllers } from '../controllers/reservations.controllers.js'

const router = Router()

router.get('/', reservationsControllers.getAllReservations)
router.get('/getReservationsByUser/:Uid_users', reservationsControllers.getReservationsByUser)
router.post('/', reservationsControllers.addReservation)
router.put('/:id', reservationsControllers.updateReservation)
router.delete('/:id', reservationsControllers.deleteReservation)

export default router
