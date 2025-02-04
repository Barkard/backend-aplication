import { Router } from 'express'
import { userProfileControllers } from '../controllers/userProfile.controllers.js'
import { verifyToken } from '../middlewares/jwt.middlewares.js'

const router = Router()


router.get('/profile', verifyToken, userProfileControllers.getUserProfile)
router.put('/profile', verifyToken, userProfileControllers.updateUserProfile)

export default router;
