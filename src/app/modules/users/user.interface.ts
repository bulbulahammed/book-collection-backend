import { Model } from 'mongoose'

type IReadingList = {
  bookIds: string[]
}
type IWishList = {
  bookIds: string[]
}
type IBooksList = {
  bookIds: string[]
}

export type IUser = {
  firstName?: string
  lastName?: string
  email: string
  password: string
  booksList?: IBooksList
  readingList?: IReadingList
  wishList?: IWishList
}

export type UserModel = Model<IUser, Record<string, unknown>>
