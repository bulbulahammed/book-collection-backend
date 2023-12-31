import { Request, RequestHandler, Response } from 'express'
import httpStatus from 'http-status'
import catchAsync from '../../../shared/catchAsync'
import sendResponse from '../../../shared/sendResponse'
import { UserService } from './user.service'

// Sign UP/Register controller
const signUp: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { user } = req.body
    const result = await UserService.signUp(user)
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'User Created Successfully!',
      data: result,
    })
  },
)

// Login controller
const login: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { user } = req.body
    const result = await UserService.login(user)
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Login Successfully!',
      data: result,
    })
  },
)

// Get All users
const getAllUsers: RequestHandler = catchAsync(
  async (_req: Request, res: Response) => {
    const users = await UserService.getAllUsers()
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Users retrieved successfully!',
      data: users,
    })
  },
)

// Get Single User by ID controller
const getUserById: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params
    const user = await UserService.getUserById(id)
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'User retrieved successfully!',
      data: user,
    })
  },
)

// Add To Wish List
const addToWishList: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { userId, bookId } = req.params
    const result = await UserService.addToWishList(userId, bookId)
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Book added to wishList successfully!',
      data: result,
    })
  },
)

// Add To Reading List
const addToReadingList: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { userId, bookId } = req.params
    const result = await UserService.addToReadingList(userId, bookId)
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Book added to Reading List successfully!',
      data: result,
    })
  },
)

// Add To Read List
const addToReadList: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { userId, bookId } = req.params
    const result = await UserService.addToReadList(userId, bookId)
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Book added to Read List successfully!',
      data: result,
    })
  },
)

export const UserController = {
  signUp,
  login,
  addToWishList,
  addToReadingList,
  addToReadList,
  getAllUsers,
  getUserById,
}
