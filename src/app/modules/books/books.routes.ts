import express from 'express'
import { BookController } from './books.controller'
const router = express.Router()

// Create a new Book
router.post('/', BookController.createBook)

// Get Single Book Route
router.get('/:id', BookController.getSingleBook)

// Update Book Route
router.patch('/:id', BookController.updateBook)

// Delete Book Route
router.delete('/:id', BookController.deleteBook)

// Get All Books
router.get('/', BookController.getAllBooks)

export const BookRoutes = router
