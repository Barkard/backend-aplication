import * as ReturnModel from "../models/return.models.js";

// Obtener todas las devoluciones
const getAllReturns = async (req, res) => {
  try {
    const returns = await ReturnModel.getAllReturns();
    res.json(returns);
  } catch (error) {
    res.status(500).json({ message: "Error fetching returns", error: error.message });
  }
};

// Obtener una devolución por ID de préstamo
const getReturnByLoanId = async (req, res) => {
  try {
    const returnData = await ReturnModel.getReturnByLoanId(req.params.id);
    if (!returnData) {
      return res.status(404).json({ message: "Return not found" });
    }
    res.json(returnData);
  } catch (error) {
    res.status(500).json({ message: "Error fetching return", error: error.message });
  }
};

// Crear una nueva devolución
const createReturn = async (req, res) => {
  try {
    const newReturn = await ReturnModel.createReturn(req.body);
    res.status(201).json(newReturn);
  } catch (error) {
    res.status(500).json({ message: "Error creating return", error: error.message });
  }
};

// Actualizar una devolución
const updateReturn = async (req, res) => {
  try {
    const updatedReturn = await ReturnModel.updateReturn(req.params.id, req.body);
    if (!updatedReturn) {
      return res.status(404).json({ message: "Return not found" });
    }
    res.json(updatedReturn);
  } catch (error) {
    res.status(500).json({ message: "Error updating return", error: error.message });
  }
};

// Eliminar una devolución
const deleteReturn = async (req, res) => {
  try {
    await ReturnModel.deleteReturn(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: "Error deleting return", error: error.message });
  }
};

export { getAllReturns, getReturnByLoanId, createReturn, updateReturn, deleteReturn };
