import { Schema, model } from 'mongoose'
import { IUser, UserModel } from './user.interface'

const userSchema = new Schema<IUser>(
  {
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    readingList: {
      bookId: [{ type: String }],
    },
    wishList: {
      bookId: [{ type: String }],
    },
    readList: {
      bookId: [{ type: String }],
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  },
)
export const User = model<IUser, UserModel>('User', userSchema)
