import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import ApiError from '../../../errors/apiError'
import { IUser } from './user.interface'
import { User } from './user.model'

const signUp = async (user: IUser): Promise<IUser | null> => {
  const { password, ...rest } = user
  const saltRounds = 10

  // Hash the password using bcrypt
  const hashedPassword = await bcrypt.hash(password, saltRounds)

  // Create a new user object with the hashed password
  const newUser = {
    ...rest,
    password: hashedPassword,
  }

  try {
    const createdUser = await User.create(newUser)
    return createdUser
  } catch (error) {
    throw new ApiError(400, 'Failed to Sign Up')
  }
}

// Login Service
type LoginResult = {
  token: string
  user: IUser
}

const login = async (user: IUser): Promise<LoginResult | null> => {
  try {
    // Find the user by their email
    const existingUser = await User.findOne({
      email: user.email,
    })

    // If the user is not found, or if the password is incorrect, return null
    if (
      !existingUser ||
      !(await bcrypt.compare(user.password, existingUser.password))
    ) {
      throw new ApiError(400, 'Failed to Login')
    }

    // Generate a JWT token for the user
    const token = jwt.sign(
      { userId: existingUser._id },
      'your_secret_key_here',
      {
        expiresIn: '1h', // Set token expiration (optional)
      },
    )
    // Return the JWT token
    return { token, user: existingUser }
  } catch (error) {
    throw new ApiError(400, 'Failed to Login')
  }
}

export const UserService = {
  signUp,
  login,
}
