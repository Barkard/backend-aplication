import * as RoleModel from "../models/role.models.js";

// Obtener todos los roles
const getAllRoles = async (req, res) => {
  try {
    const roles = await RoleModel.getAllRoles();
    res.json(roles);
  } catch (error) {
    res.status(500).json({ message: "Error fetching roles", error: error.message });
  }
};

// Obtener un rol por ID
const getRoleById = async (req, res) => {
  try {
    const role = await RoleModel.getRoleById(req.params.id);
    if (!role) {
      return res.status(404).json({ message: "Role not found" });
    }
    res.json(role);
  } catch (error) {
    res.status(500).json({ message: "Error fetching role", error: error.message });
  }
};

// Crear un nuevo rol
const createRole = async (req, res) => {
  try {
    const newRole = await RoleModel.createRole(req.body);
    res.status(201).json(newRole);
  } catch (error) {
    res.status(500).json({ message: "Error creating role", error: error.message });
  }
};

// Actualizar un rol
const updateRole = async (req, res) => {
  try {
    const updatedRole = await RoleModel.updateRole(req.params.id, req.body);
    if (!updatedRole) {
      return res.status(404).json({ message: "Role not found" });
    }
    res.json(updatedRole);
  } catch (error) {
    res.status(500).json({ message: "Error updating role", error: error.message });
  }
};

// Eliminar un rol
const deleteRole = async (req, res) => {
  try {
    await RoleModel.deleteRole(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: "Error deleting role", error: error.message });
  }
};

export { getAllRoles, getRoleById, createRole, updateRole, deleteRole };
