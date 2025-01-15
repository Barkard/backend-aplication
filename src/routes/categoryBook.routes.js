import { Router } from 'express';
import {
  getAllCategoryBooks,
  getCategoryBookById,
  createCategoryBook,
  updateCategoryBook,
  deleteCategoryBook
} from '../controllers/categoryBook.controllers.js';

const router = Router();

router.get('/category-books', getAllCategoryBooks);
router.get('/category-books/:id', getCategoryBookById);
router.post('/category-books', createCategoryBook);
router.put('/category-books/:id', updateCategoryBook);
router.delete('/category-books/:id', deleteCategoryBook);

export default router;
