import { Request, RequestHandler, Response } from 'express'
import httpStatus from 'http-status'
import catchAsync from '../../../shared/catchAsync'
import sendResponse from '../../../shared/sendResponse'
import { UserService } from './user.service'

// Sign/Register up controller
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

export const UserController = {
  signUp,
  login,
}
