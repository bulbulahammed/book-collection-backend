/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response } from 'express'
import httpStatus from 'http-status'
import catchAsync from '../../../shared/catchAsync'
import sendResponse from '../../../shared/sendResponse'
import { IBook } from '../books/books.interface'
import reviewsService from './reviews.service'

// AddReview Controller
const addReview = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id
  const review = req.body
  const result = await reviewsService.addReview(id, review)
  sendResponse<IBook>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Review Added Successfully!',
    data: result,
  })
})

// Delete Review Controller
const deleteReview = catchAsync(async (req: Request, res: Response) => {
  const bookId = req.params.bookId
  const reviewId = req.params.reviewId
  const result = await reviewsService.deleteReview(bookId, reviewId)

  if (result) {
    sendResponse<IBook>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Review Deleted Successfully!',
      data: result,
    })
  } else {
    sendResponse<IBook>(res, {
      statusCode: httpStatus.NOT_FOUND,
      success: false,
      message: 'Review not found',
    })
  }
})

export const ReviewController = {
  addReview,
  deleteReview,
}
