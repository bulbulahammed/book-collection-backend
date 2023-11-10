import { Model } from 'mongoose'

export type IReadingList = {
  bookId: string[]
}

export type IWishList = {
  bookId: string[]
}

export type IReadList = {
  bookId: string[]
}

export type IUser = {
  firstName?: string
  lastName?: string
  email: string
  password: string
  readingList?: IReadingList
  wishList?: IWishList
  readList?: IReadList
}

export type UserModel = Model<IUser, Record<string, unknown>>
