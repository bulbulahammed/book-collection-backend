import { Model } from 'mongoose'

export type IBookStatus = 'N/A' | 'Reading' | 'Finished'
export type IBookRating = '1' | '2' | '3' | '4' | '5'

export type IBookReview = {
  rating: IBookRating
  comment: string
  reviewer: string
}

export type IBook = {
  title: string
  author: string
  genre: string
  publicationYear: string
  img: string
  addedBy?: string
  status: IBookStatus
  reviews?: IBookReview[]
  description: string
}

export type BookModel = Model<IBook>

export type IBookFilters = {
  searchTerm?: string
}
