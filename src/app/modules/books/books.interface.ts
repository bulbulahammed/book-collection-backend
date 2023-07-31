import { Model } from 'mongoose'

export type IBookStatus = 'N/A' | 'Reading' | 'Finished'

export type IBookReviews = {
  review: string[]
}

export type IBook = {
  title: string
  author: string
  genre: string
  publicationYear: string
  img: string
  user?: string
  status: IBookStatus
  reviews?: IBookReviews
}

export type BookModel = Model<IBook, Record<string, unknown>>

export type IBookFilters = {
  searchTerm?: string
}
