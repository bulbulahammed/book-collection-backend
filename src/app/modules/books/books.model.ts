import { Schema, model } from 'mongoose'
import { bookStatus } from './books.constant'
import { BookModel, IBook } from './books.interface'

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
    reviews: {
      type: String,
    },
    description: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  },
)
export const Book = model<IBook, BookModel>('Book', bookSchema)
