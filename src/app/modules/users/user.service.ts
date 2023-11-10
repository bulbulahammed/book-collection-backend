import bcrypt from 'bcrypt'
import ApiError from '../../../errors/apiError'
import { generateToken } from '../../../utils/generateToken'
import { IUser } from './user.interface'
import { User } from './user.model'

const signUp = async (user: IUser): Promise<IUser | null> => {
  const { email, password, ...rest } = user
  const saltRounds = 10

  try {
    // Check if a user with the same email already exists
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      throw new ApiError(400, 'User with this email already exists')
    }

    // Hash the password using bcrypt
    const hashedPassword = await bcrypt.hash(password, saltRounds)

    // Create a new user object with the hashed password
    const newUser = {
      ...rest,
      email,
      password: hashedPassword,
    }

    const createdUser = await User.create(newUser)
    return createdUser
  } catch (error) {
    if (error instanceof ApiError) {
      throw error
    }
    throw new ApiError(400, 'Failed to Sign Up')
  }
}

// Login Service

type LoginResult = {
  user: IUser
  token: string
}

const login = async (user: IUser): Promise<LoginResult | null> => {
  try {
    // Find the user by their email
    const loggedInUser = await User.findOne({
      email: user.email,
    })

    if (
      !loggedInUser ||
      !(await bcrypt.compare(user.password, loggedInUser.password))
    ) {
      if (!loggedInUser) {
        throw new ApiError(404, 'User Not Found !')
      } else {
        throw new ApiError(400, 'Incorrect Password !')
      }
    }

    // Generate a JWT token for the user
    const token = generateToken(loggedInUser.id)

    // Return the JWT token
    return { token, user: loggedInUser }
  } catch (error) {
    if (error instanceof ApiError) {
      throw error
    }
    throw new ApiError(400, 'Failed to Login')
  }
}

// Get All Users

const getAllUsers = async (): Promise<IUser[] | null> => {
  try {
    const users = await User.find()
    return users
  } catch (error) {
    if (error instanceof ApiError) {
      throw error
    }
    throw new ApiError(400, 'Failed to fetch users')
  }
}

// Get Single user By Id
const getUserById = async (id: string): Promise<IUser | null> => {
  try {
    const user = await User.findById(id)
    if (!user) {
      throw new ApiError(404, 'User not found')
    }
    return user
  } catch (error) {
    if (error instanceof ApiError) {
      throw error
    }
    throw new ApiError(400, 'Failed to fetch user by ID')
  }
}

// Add To Wish List
const addToWishList = async (
  userId: string,
  bookId: string,
): Promise<IUser | null> => {
  try {
    const user = await User.findById(userId)
    if (!user) {
      throw new ApiError(404, 'User not found')
    }

    // Remove the book from readingList and readList if it exists
    if (user.readingList && user.readingList.bookId) {
      user.readingList.bookId = user.readingList.bookId.filter(
        (id: string) => id !== bookId,
      )
    }
    if (user.readList && user.readList.bookId) {
      user.readList.bookId = user.readList.bookId.filter(
        (id: string) => id !== bookId,
      )
    }

    // Add the book to wishList if not already present
    if (
      user.wishList &&
      user.wishList.bookId &&
      !user.wishList.bookId.includes(bookId)
    ) {
      user.wishList.bookId.push(bookId)
    }

    // Save and return the updated user
    return await user.save()
  } catch (error) {
    if (error instanceof ApiError) {
      throw error
    }
    throw new ApiError(400, 'Failed To Add')
  }
}

// Add To Reading List
const addToReadingList = async (
  userId: string,
  bookId: string,
): Promise<IUser | null> => {
  try {
    const user = await User.findById(userId)
    if (!user) {
      throw new ApiError(404, 'User not found')
    }
    // Remove the book from wishList and readList if it exists
    if (user.wishList && user.wishList.bookId) {
      user.wishList.bookId = user.wishList.bookId.filter(
        (id: string) => id !== bookId,
      )
    }
    if (user.readList && user.readList.bookId) {
      user.readList.bookId = user.readList.bookId.filter(
        (id: string) => id !== bookId,
      )
    }
    // Add the book to Reading if not already present
    if (
      user.readingList &&
      user.readingList.bookId &&
      !user.readingList.bookId.includes(bookId)
    ) {
      user.readingList.bookId.push(bookId)
    }
    // Save and return the updated user
    return await user.save()
  } catch (error) {
    if (error instanceof ApiError) {
      throw error
    }
    throw new ApiError(400, 'Failed To Add')
  }
}

// Add To Read List
const addToReadList = async (
  userId: string,
  bookId: string,
): Promise<IUser | null> => {
  try {
    const user = await User.findById(userId)
    if (!user) {
      throw new ApiError(404, 'User not found')
    }
    // Remove the book from wishList and Reading List if it exists
    if (user.wishList && user.wishList.bookId) {
      user.wishList.bookId = user.wishList.bookId.filter(
        (id: string) => id !== bookId,
      )
    }
    if (user.readingList && user.readingList.bookId) {
      user.readingList.bookId = user.readingList.bookId.filter(
        (id: string) => id !== bookId,
      )
    }
    // Add the book to Read if not already present
    if (
      user.readList &&
      user.readList.bookId &&
      !user.readList.bookId.includes(bookId)
    ) {
      user.readList.bookId.push(bookId)
    }
    // Save and return the updated user
    return await user.save()
  } catch (error) {
    if (error instanceof ApiError) {
      throw error
    }
    throw new ApiError(400, 'Failed To Add')
  }
}

export const UserService = {
  signUp,
  login,
  addToWishList,
  addToReadingList,
  addToReadList,
  getAllUsers,
  getUserById,
}
