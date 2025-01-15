import { getAllBooks, getBookById, createBook, updateBook, deleteBook } from '../models/books.models.js';

export const getBooks = async (req, res) => {
    try {
        const books = await getAllBooks();
        res.status(200).json(books);
    } catch (error) {
        res.status(500).json({ message: "Error fetching books" });
    }
};

export const getBook = async (req, res) => {
    const { id } = req.params;
    try {
        const book = await getBookById(id);
        if (!book) {
            return res.status(404).json({ message: "Book not found" });
        }
        res.status(200).json(book);
    } catch (error) {
        res.status(500).json({ message: "Error fetching book" });
    }
};

export const createNewBook = async (req, res) => {
    const bookData = req.body;
    try {
        const newBook = await createBook(bookData);
        res.status(201).json(newBook);
    } catch (error) {
        res.status(500).json({ message: "Error creating book" });
    }
};

export const updateBookById = async (req, res) => {
    const { id } = req.params;
    const bookData = req.body;
    try {
        const updatedBook = await updateBook(id, bookData);
        if (!updatedBook) {
            return res.status(404).json({ message: "Book not found" });
        }
        res.status(200).json(updatedBook);
    } catch (error) {
        res.status(500).json({ message: "Error updating book" });
    }
};

export const deleteBookById = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedBook = await deleteBook(id);
        if (!deletedBook) {
            return res.status(404).json({ message: "Book not found" });
        }
        res.status(200).json({ message: "Book deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting book" });
    }
};
