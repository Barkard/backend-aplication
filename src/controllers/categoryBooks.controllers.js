
import categoryBookModel from "../models/categoryBooks.models.js"

const getAllCategories = async (req, res) => {
    try {
        const categories = await categoryBookModel.getAllCategories()
        res.status(200).json({ ok: true, data: categories })
    } catch (error) {
        console.error("Error fetching categories:", error)
        res.status(500).json({ ok: false, msg: "Internal server error" })
    }
};

const getCategoryById = async (req, res) => {
    try {
        const { id_category_book } = req.params
        const category = await categoryBookModel.getCategoryById(id_category_book)
        if (!category) {
            return res.status(404).json({ ok: false, msg: "Category not found" })
        }
        res.status(200).json({ ok: true, data: category })
    } catch (error) {
        console.error("Error fetching category by ID:", error)
        res.status(500).json({ ok: false, msg: "Internal server error" })
    }
}

const addCategory = async (req, res) => {
    try {
        const { category_name, description_category } = req.body
        const newCategory = await categoryBookModel.addCategory({ category_name, description_category })
        res.status(201).json({ ok: true, data: newCategory })
    } catch (error) {
        console.error("Error adding category:", error)
        res.status(500).json({ ok: false, msg: "Error adding category" })
    }
}

const updateCategory = async (req, res) => {
    try {
        const { id_category_book } = req.params
        const { category_name, description_category } = req.body
        const updatedCategory = await categoryBookModel.updateCategory(id_category_book, { category_name, description_category })
        if (!updatedCategory) {
            return res.status(404).json({ ok: false, msg: "Category not found" })
        }
        res.status(200).json({ ok: true, data: updatedCategory })
    } catch (error) {
        console.error("Error updating category:", error)
        res.status(500).json({ ok: false, msg: "Error updating category" })
    }
}

const deleteCategory = async (req, res) => {
    try {
        const { id_category_book } = req.params
        const deletedCategory = await categoryBookModel.deleteCategory(id_category_book)
        if (!deletedCategory) {
            return res.status(404).json({ ok: false, msg: "Category not found" })
        }
        res.status(200).json({ ok: true, data: deletedCategory, msg: 'Category deleted successfully' })
    } catch (error) {
        console.error("Error deleting category:", error)
        res.status(500).json({ ok: false, msg: "Error deleting category" })
    }
}

export default {
    getAllCategories,
    getCategoryById,
    addCategory,
    updateCategory,
    deleteCategory
}
