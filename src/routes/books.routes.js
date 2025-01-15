import { Router } from 'express';
import { getBooks, getBook, createNewBook, updateBookById, deleteBookById } from '../controllers/books.controllers.js';

const router = Router();

// Get all books
router.get('/books', getBooks);

// Get a book by its ID
router.get('/books/:id', getBook);

// Create a new book
router.post('/books', createNewBook);

// Update a book by its ID
router.put('/books/:id', updateBookById);

// Delete a book by its ID
router.delete('/books/:id', deleteBookById);

export default router;
