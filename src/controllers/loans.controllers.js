import * as LoanModel from "../models/loans.models.js";

// Obtener todos los préstamos
const getAllLoans = async (req, res) => {
  try {
    const loans = await LoanModel.getAllLoans();
    res.json(loans);
  } catch (error) {
    res.status(500).json({ message: "Error fetching loans", error: error.message });
  }
};

// Obtener un préstamo por ID
const getLoanById = async (req, res) => {
  try {
    const loan = await LoanModel.getLoanById(req.params.id);
    if (!loan) {
      return res.status(404).json({ message: "Loan not found" });
    }
    res.json(loan);
  } catch (error) {
    res.status(500).json({ message: "Error fetching loan", error: error.message });
  }
};

// Crear un nuevo préstamo
const createLoan = async (req, res) => {
  try {
    const newLoan = await LoanModel.createLoan(req.body);
    res.status(201).json(newLoan);
  } catch (error) {
    res.status(500).json({ message: "Error creating loan", error: error.message });
  }
};

// Actualizar un préstamo
const updateLoan = async (req, res) => {
  try {
    const updatedLoan = await LoanModel.updateLoan(req.params.id, req.body);
    if (!updatedLoan) {
      return res.status(404).json({ message: "Loan not found" });
    }
    res.json(updatedLoan);
  } catch (error) {
    res.status(500).json({ message: "Error updating loan", error: error.message });
  }
};

// Eliminar un préstamo
const deleteLoan = async (req, res) => {
  try {
    await LoanModel.deleteLoan(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: "Error deleting loan", error: error.message });
  }
};

export { getAllLoans, getLoanById, createLoan, updateLoan, deleteLoan };
