import express from 'express'
import { BookController } from './books.controller'
const router = express.Router()

// Register a new user
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
