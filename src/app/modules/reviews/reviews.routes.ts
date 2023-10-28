import express from 'express'
import { ReviewController } from './reviews.controller'
// import { BookController } from './books.controller'
const router = express.Router()

// Add Review Route
router.patch('/:id', ReviewController.addReview)

export const ReviewRoutes = router
