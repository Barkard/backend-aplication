import * as LotModel from "../models/lot.models.js";

// Obtener todos los lotes
const getAllLots = async (req, res) => {
  try {
    const lots = await LotModel.getAllLots();
    res.json(lots);
  } catch (error) {
    res.status(500).json({ message: "Error fetching lots", error: error.message });
  }
};

// Obtener un lote por ID
const getLotById = async (req, res) => {
  try {
    const lot = await LotModel.getLotById(req.params.id);
    if (!lot) {
      return res.status(404).json({ message: "Lot not found" });
    }
    res.json(lot);
  } catch (error) {
    res.status(500).json({ message: "Error fetching lot", error: error.message });
  }
};

// Crear un nuevo lote
const createLot = async (req, res) => {
  try {
    const newLot = await LotModel.createLot(req.body);
    res.status(201).json(newLot);
  } catch (error) {
    res.status(500).json({ message: "Error creating lot", error: error.message });
  }
};

// Actualizar un lote
const updateLot = async (req, res) => {
  try {
    const updatedLot = await LotModel.updateLot(req.params.id, req.body);
    if (!updatedLot) {
      return res.status(404).json({ message: "Lot not found" });
    }
    res.json(updatedLot);
  } catch (error) {
    res.status(500).json({ message: "Error updating lot", error: error.message });
  }
};

// Eliminar un lote
const deleteLot = async (req, res) => {
  try {
    await LotModel.deleteLot(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: "Error deleting lot", error: error.message });
  }
};

export { getAllLots, getLotById, createLot, updateLot, deleteLot };
