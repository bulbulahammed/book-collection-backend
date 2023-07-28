import express from 'express'
import { BookController } from './books.controller'
const router = express.Router()

// Register a new user
router.post('/create-book', BookController.createBook)

export const BookRoutes = router
