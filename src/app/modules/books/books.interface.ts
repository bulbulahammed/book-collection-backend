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
  addedBy?: string
  status: IBookStatus
  reviews?: IBookReviews
  description: string
}

export type BookModel = Model<IBook, Record<string, unknown>>

export type IBookFilters = {
  searchTerm?: string
}
