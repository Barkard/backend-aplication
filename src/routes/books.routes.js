import { Router } from 'express'
import { booksControllers } from '../controllers/books.controllers.js'

const router = Router()

router.get('/', booksControllers.getAllBooks)
router.get('/getBooksByCategory/:id_category_book', booksControllers.getBooksByCategory)
router.post('/', booksControllers.addBook)
router.put('/:id', booksControllers.updateBook)
router.delete('/:id', booksControllers.deleteBook)

export default router
