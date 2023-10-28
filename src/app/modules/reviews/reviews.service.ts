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

export default {
  addReview,
}
