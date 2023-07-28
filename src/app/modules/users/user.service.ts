import ApiError from '../../../errors/apiError'
import { IUser } from './user.interface'
import { User } from './user.model'

// Signup/ Register Service
const signUp = async (user: IUser): Promise<IUser | null> => {
  const createdUser = await User.create(user)
  if (!signUp) {
    throw new ApiError(400, 'Failed to Sign Up')
  }
  return createdUser
}

// Login Service
const login = async (user: IUser): Promise<IUser | null> => {
  const createdUser = await User.findOne({
    email: user.email,
    password: user.password,
  })
  if (!login) {
    throw new ApiError(400, 'Failed to Login')
  }
  return createdUser
}

export const UserService = {
  signUp,
  login,
}
