import { Router } from "express";
import { rolesControllers } from "../controllers/roles.controllers.js"

const router = Router()

router.get('/', rolesControllers.getAllRoles)
router.get('/:id', rolesControllers.getRolesById)
router.post('/addRole', rolesControllers.addRole)
router.put('/:id', rolesControllers.updateRole)
router.delete('/:id', rolesControllers.deleteRole)

export default router