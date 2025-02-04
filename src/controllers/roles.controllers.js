import { query } from 'express'
import { rolesModel } from "../models/roles.models.js"

const getAllRoles = async (req, res) => {
    try {
        const roles = await rolesModel.getAllRoles()
        return res.json({ok: true, msg: roles})
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Error retrieving the roles' })
    }
}

const getRolesById = async (req, res) => {
    try {
        const { id } = req.params
        const role = await rolesModel.getRolesById(id)
        if (!role) {
            return res.status(404).json({ ok: false, msg: 'Role not found' })
        }

        res.status(200).json({ ok: true, data: role })
    } catch (error) {
        console.error('Error fetching role by ID:', error)
        res.status(500).json({ ok: false, msg: 'Internal server error' })
    }
}

const addRole = async (req, res) => {
    try {
        console.log(req.body)
        const { name, description } = req.body

        if (!name || !description) {
            return res.status(400).json({ ok: false, msg: 'Missing required fields: name, description' })
        }

        const roleExists = await rolesModel.findOneByRole(name)
        if (roleExists) {
            return res.status(409).json({ ok: false, msg: 'Role already exists.' })
        }

        const newRole = await rolesModel.addRole({ name, description })
        return res.status(201).json({ ok: true, msg: 'Role created successfully', data: newRole })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ ok: false, msg: 'Server error' })
    }
}

const updateRole = async (req, res) => {
    try {
        const { id } = req.params
        const { name, description } = req.body

        if (!id || !name || !description) {
            return res.status(400).json({
                ok: false,
                msg: 'Missing required fields: id, name, description',
            })
        }

        const updatedRole = await rolesModel.updateRole(id, { name, description })

        if (!updatedRole) {
            return res.status(404).json({ ok: false, msg: 'Role not found' })
        }

        res.status(200).json({ ok: true, data: updatedRole })
    } catch (error) {
        console.error('Error updating role:', error)
        res.status(500).json({ ok: false, msg: 'Error updating role' })
    }
}

const deleteRole = async (req, res) => {
    try {
        const {id} = req.params
        const deletedRole = await rolesModel.deleteRole(id)
        
        if(!deletedRole) {
            return res.status(404).json({ok: false, msg: 'Role not found'})
        }

        res.status(200).json({ok: true, msg: 'Role deleted successfully'})
    } catch (error) {
        console.error(error)
        res.status(500).json({ok: false, msg: 'Error deleting role'})
    }
}

export const rolesControllers = { getAllRoles, getRolesById, addRole, updateRole, deleteRole }