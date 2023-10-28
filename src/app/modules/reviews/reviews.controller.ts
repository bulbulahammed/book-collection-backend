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

export const ReviewController = {
  addReview,
}
