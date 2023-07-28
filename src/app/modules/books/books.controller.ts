import { Request, RequestHandler, Response } from 'express'
import httpStatus from 'http-status'
import catchAsync from '../../../shared/catchAsync'
import sendResponse from '../../../shared/sendResponse'
import { IBook } from './books.interface'
import booksService from './books.service'

// Create Cow Controller
const createBook: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { book } = req.body
    const result = await booksService.createBook(book)
    sendResponse<IBook>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Book Created Successfully!',
      data: result,
    })
  },
)

export const BookController = {
  createBook,
}
