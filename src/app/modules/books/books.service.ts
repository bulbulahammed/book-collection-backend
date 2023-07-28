import ApiError from '../../../errors/apiError'
import { IBook } from './books.interface'
import { Book } from './books.model'

// Create Cow Service
const createBook = async (book: IBook): Promise<IBook | null> => {
  const createdCow = await Book.create(book)
  if (!createBook) {
    throw new ApiError(400, 'Failed To Create Book!')
  }
  return createdCow
}

export default {
  createBook,
}
