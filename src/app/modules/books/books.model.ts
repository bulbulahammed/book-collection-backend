import { Schema, model } from 'mongoose'
import { bookRating, bookStatus } from './books.constant'
import { BookModel, IBook } from './books.interface'

const reviewSchema = new Schema(
  {
    rating: {
      type: String,
      enum: bookRating,
    },
    comment: {
      type: String,
    },
    reviewer: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
)

const bookSchema = new Schema<IBook>(
  {
    title: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    genre: {
      type: String,
      required: true,
    },
    publicationYear: {
      type: String,
      required: true,
    },
    img: {
      type: String,
      required: true,
    },
    addedBy: {
      type: String,
      ref: 'addedBy',
    },
    status: {
      type: String,
      enum: bookStatus,
    },
    description: {
      type: String,
      required: true,
    },
    reviews: [reviewSchema],
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  },
)

export const Book = model<IBook, BookModel>('Book', bookSchema)
