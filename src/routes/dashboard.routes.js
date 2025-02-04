import express from 'express'
import { dashboardController } from '../controllers/dashboard.controllers.js'

const router = express.Router()

router.get('/', dashboardController.getDashboardData)

export default router
