import { Request, RequestHandler, Response } from 'express'
import httpStatus from 'http-status'
import { paginationFields } from '../../../constants/paginationFields'
import catchAsync from '../../../shared/catchAsync'
import pick from '../../../shared/pick'
import sendResponse from '../../../shared/sendResponse'
import { booksFilterableFields } from './books.constant'
import { IBook } from './books.interface'
import booksService from './books.service'

// Create Book Controller
const createBook: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    try {
      const { book } = req.body
      const result = await booksService.createBook(book)

      sendResponse<IBook>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Book Created Successfully!',
        data: result,
      })
    } catch (error) {
      // Handle the error and send an error response to the frontend
      sendResponse<IBook>(res, {
        statusCode: httpStatus.INTERNAL_SERVER_ERROR,
        success: false,
        message: 'An error occurred while creating the book.',
        error: (error as Error).message as string, // Cast error to Error, then access message
      })
    }
  },
)

// Get All Book Controller
const getAllBooks = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, booksFilterableFields)
  const paginationOptions = pick(req.query, paginationFields)
  const result = await booksService.getAllBooks(filters, paginationOptions)
  sendResponse<IBook[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Books retrieved Successfully!',
    meta: result.meta,
    data: result.data,
  })
})

// Get Single Book
const getSingleBook = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id
  const result = await booksService.getSingleBook(id)
  sendResponse<IBook>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Book Retrieved Successfully!',
    data: result,
  })
})

// Update Book Controller
const updateBook = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id
  const updatedData = req.body
  const result = await booksService.updateBook(id, updatedData)
  sendResponse<IBook>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Book Updated Successfully!',
    data: result,
  })
})

// Delete Book
const deleteBook = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id
  const result = await booksService.deleteBook(id)
  sendResponse<IBook>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Book Deleted Successfully!',
    data: result,
  })
})

export const BookController = {
  createBook,
  getAllBooks,
  getSingleBook,
  updateBook,
  deleteBook,
}
