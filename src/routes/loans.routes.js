import { Router } from "express";
import { 
  getAllLoans,
  getLoanById,
  createLoan,
  updateLoan,
  deleteLoan
} from "../controllers/loans.controllers.js";

const router = Router();

// Obtener todos los préstamos
router.get("/loans", getAllLoans);

// Obtener un préstamo por ID
router.get("/loans/:id", getLoanById);

// Crear un nuevo préstamo
router.post("/loans", createLoan);

// Actualizar un préstamo
router.put("/loans/:id", updateLoan);

// Eliminar un préstamo
router.delete("/loans/:id", deleteLoan);

export default router;
