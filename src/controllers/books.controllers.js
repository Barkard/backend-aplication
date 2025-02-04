import { booksModel } from '../models/books.models.js'

const getAllBooks = async (req, res) => {
    try {
        const books = await booksModel.getAllBooks()
        res.status(200).json({ ok: true, data: books })
    } catch (error) {
        console.error('Error fetching books:', error)
        res.status(500).json({ ok: false, msg: 'Error fetching books' })
    }
}

const getBooksByCategory = async (req, res) => {
    try {
        const { id_category_book } = req.params
        const books = await booksModel.getBooksByCategory(id_category_book)

        if (books.length === 0) {
            return res.status(404).json({ ok: false, msg: 'No books found for this category' })
        }

        res.status(200).json({ ok: true, data: books })
    } catch (error) {
        console.error('Error fetching books by category:', error)
        res.status(500).json({ ok: false, msg: 'Internal server error' })
    }
}

const addBook = async (req, res) => {
    try {
        const { id_category_book, cota_book, name, description, editorial, autor } = req.body
        if (!id_category_book || !cota_book || !name || !description || !editorial || !autor) {
            return res.status(400).json({ ok: false, msg: 'Missing required fields' })
        }

        const newBook = await booksModel.addBook({ id_category_book, cota_book, name, description, editorial, autor })
        res.status(201).json({ ok: true, data: newBook })
    } catch (error) {
        console.error('Error adding book:', error)
        res.status(500).json({ ok: false, msg: 'Error adding book' })
    }
}

const deleteBook = async (req, res) => {
    try {
        const { id } = req.params
        const deletedBook = await booksModel.deleteBook(id)

        if (!deletedBook) {
            return res.status(404).json({ ok: false, msg: 'Book not found' })
        }

        res.status(200).json({ ok: true, msg: 'Book deleted successfully', data: deletedBook })
    } catch (error) {
        console.error('Error deleting book:', error)
        res.status(500).json({ ok: false, msg: 'Error deleting book' })
    }
}

const updateBook = async (req, res) => {
    try {
        const { id } = req.params
        const { id_category_book, cota_book, name, description, editorial, autor } = req.body

        if (!id_category_book || !cota_book || !name || !description || !editorial || !autor) {
            return res.status(400).json({ ok: false, msg: 'Missing required fields' })
        }

        const updatedBook = await booksModel.updateBook(id, { id_category_book, cota_book, name, description, editorial, autor })

        if (!updatedBook) {
            return res.status(404).json({ ok: false, msg: 'Book not found' })
        }

        res.status(200).json({ ok: true, msg: 'Book updated successfully', data: updatedBook })
    } catch (error) {
        console.error('Error updating book:', error)
        res.status(500).json({ ok: false, msg: 'Error updating book' })
    }
}

export const booksControllers = { getAllBooks, getBooksByCategory, addBook, deleteBook, updateBook }
