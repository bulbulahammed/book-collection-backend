import { Response } from 'express'

type IApiResponse<T> = {
  statusCode: number
  success: boolean
  message?: string | null
  meta?: {
    page: number
    limit: number
    total: number
  }
  data?: T | null
  error?: string | null // Add an optional error property for error responses
}

const sendResponse = <T>(res: Response, data: IApiResponse<T>): void => {
  const responseData: IApiResponse<T> = {
    statusCode: data.statusCode,
    success: data.success,
    message: data.message,
    data: data.data || null,
    error: data.error || null, // Include the error property if it exists
  }
  res.status(data.statusCode).json(responseData)
}

export default sendResponse
