import { getAllCategories, getCategoryById, createCategory, updateCategory, deleteCategory } from '../models/categoryBook.models.js';

const getAllCategoryBooks = async (req, res) => {
  try {
    const categories = await getAllCategories();
    res.json(categories);
  } catch (err) {
    res.status(500).send('Error fetching categories: ' + err);
  }
};

const getCategoryBookById = async (req, res) => {
  const { id } = req.params;
  try {
    const category = await getCategoryById(id);
    if (category) {
      res.json(category);
    } else {
      res.status(404).send('Category not found');
    }
  } catch (err) {
    res.status(500).send('Error fetching category: ' + err);
  }
};

const createCategoryBook = async (req, res) => {
  const { name, description } = req.body;
  try {
    const newCategory = await createCategory(name, description);
    res.status(201).json(newCategory);
  } catch (err) {
    res.status(500).send('Error creating category: ' + err);
  }
};

const updateCategoryBook = async (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;
  try {
    const updatedCategory = await updateCategory(id, name, description);
    if (updatedCategory) {
      res.json(updatedCategory);
    } else {
      res.status(404).send('Category not found');
    }
  } catch (err) {
    res.status(500).send('Error updating category: ' + err);
  }
};

const deleteCategoryBook = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedCategory = await deleteCategory(id);
    if (deletedCategory) {
      res.json(deletedCategory);
    } else {
      res.status(404).send('Category not found');
    }
  } catch (err) {
    res.status(500).send('Error deleting category: ' + err);
  }
};

export { getAllCategoryBooks, getCategoryBookById, createCategoryBook, updateCategoryBook, deleteCategoryBook };
