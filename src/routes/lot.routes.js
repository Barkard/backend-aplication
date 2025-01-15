import { Router } from "express";
import { 
  getAllLots,
  getLotById,
  createLot,
  updateLot,
  deleteLot
} from "../controllers/lot.controllers.js";

const router = Router();

// Obtener todos los lotes
router.get("/lot", getAllLots);

// Obtener un lote por ID
router.get("/lot/:id", getLotById);

// Crear un nuevo lote
router.post("/lot", createLot);

// Actualizar un lote
router.put("/lot/:id", updateLot);

// Eliminar un lote
router.delete("/lot/:id", deleteLot);

export default router;
