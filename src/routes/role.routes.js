import { Router } from "express";
import { 
  getAllRoles,
  getRoleById,
  createRole,
  updateRole,
  deleteRole
} from "../controllers/role.controllers.js";

const router = Router();

// Obtener todos los roles
router.get("/role", getAllRoles);

// Obtener un rol por ID
router.get("/role/:id", getRoleById);

// Crear un nuevo rol
router.post("/role", createRole);

// Actualizar un rol
router.put("/role/:id", updateRole);

// Eliminar un rol
router.delete("/role/:id", deleteRole);

export default router;
