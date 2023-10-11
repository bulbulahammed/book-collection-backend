/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { SortOrder } from 'mongoose'
import ApiError from '../../../errors/apiError'
import { paginationHelpers } from '../../../helpers/paginationHelpers'
import { IGenericResponse } from '../../../interfaces/common'
import { IPaginationOptions } from '../../../interfaces/pagination'
import { IBook, IBookFilters } from './books.interface'
import { Book } from './books.model'

// Create Book Service
const createBook = async (book: IBook): Promise<IBook | null> => {
  const createdBook = await Book.create(book)
  if (!createBook) {
    throw new ApiError(400, 'Failed To Create Book!')
  }
  return createdBook
}

// Get all books

const getAllBooks = async (
  filters: IBookFilters,
  paginationOptions: IPaginationOptions,
): Promise<IGenericResponse<IBook[]>> => {
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions)

  const { searchTerm, ...filtersData } = filters

  // Define the `whereConditions` variable
  const whereConditions: any = {}

  // Filter
  if (Object.keys(filtersData).length) {
    // Create an empty array to store the `$and` conditions
    const andConditions = []

    // Loop through the filter data and add each condition to the array
    for (const [field, value] of Object.entries(filtersData)) {
      // If the value is not an empty string, add the condition to the array
      if (value !== '') {
        andConditions.push({ [field]: value })
      }
    }

    // If there are any conditions in the array, add them to the where clause
    if (andConditions.length > 0) {
      whereConditions.$and = andConditions
    }
  }

  const sortCondition: { [key: string]: SortOrder } = {}

  if (sortBy && sortOrder) {
    sortCondition[sortBy] = sortOrder
  }

  const result = await Book.find(whereConditions)
    .sort(sortCondition)
    .skip(skip)
    .limit(limit)
  const total = await Book.countDocuments(whereConditions)
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  }
}

// Get Single Book By ID
const getSingleBook = async (id: string): Promise<IBook | null> => {
  const result = await Book.findById(id)
  return result
}

// Update Books Service
const updateBook = async (
  id: string,
  payload: Partial<IBook>,
): Promise<IBook | null> => {
  const result = await Book.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  })
  return result
}

// Delete Book Service
const deleteBook = async (id: string): Promise<IBook | null> => {
  const result = await Book.findByIdAndDelete(id)
  return result
}
export default {
  createBook,
  getAllBooks,
  getSingleBook,
  updateBook,
  deleteBook,
}
