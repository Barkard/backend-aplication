import { Router } from "express";
import { 
  getAllReturns,
  getReturnByLoanId,
  createReturn,
  updateReturn,
  deleteReturn
} from "../controllers/return.controllers.js";

const router = Router();

// Obtener todas las devoluciones
router.get("/return", getAllReturns);

// Obtener una devolución por ID de préstamo
router.get("/return/:id", getReturnByLoanId);

// Crear una nueva devolución
router.post("/return", createReturn);

// Actualizar una devolución
router.put("/return/:id", updateReturn);

// Eliminar una devolución
router.delete("/return/:id", deleteReturn);

export default router;
