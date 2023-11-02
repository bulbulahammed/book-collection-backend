/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { IBook } from '../books/books.interface'
import { Book } from '../books/books.model'

// Add Review Service
const addReview = async (
  id: string,
  review: Partial<IBook>,
): Promise<IBook | null> => {
  const result = await Book.findOneAndUpdate(
    { _id: id },
    { $push: { reviews: review } },
  )
  return result
}

// Delete Review Service
const deleteReview = async (
  bookId: string,
  reviewId: string,
): Promise<IBook | null> => {
  try {
    const result = await Book.findOneAndUpdate(
      { _id: bookId },
      { $pull: { reviews: { _id: reviewId } } },
      { new: true },
    )

    if (result) {
      return result
    } else {
      // Handle the case where the book or review was not found
      return null
    }
  } catch (error) {
    // Handle any errors that occurred during the update
    console.error('Error deleting review:', error)
    return null
  }
}

export default {
  addReview,
  deleteReview,
}
