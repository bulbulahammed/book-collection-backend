import express from 'express'
import { UserController } from './user.controller'
const router = express.Router()

// Register a new user
router.post('/sign-up', UserController.signUp)

// Login a user
router.post('/login', UserController.login)

// Get All User
router.get('/', UserController.getAllUsers)

// Get All User
router.get('/:id', UserController.getUserById)

// Users WishList
router.patch('/wishList/:userId/:bookId', UserController.addToWishList)

// Users Reading List
router.patch('/readingList/:userId/:bookId', UserController.addToReadingList)

// // Users Read List
// router.patch('/readList/:userId/:bookId', UserController.addToReadList);

export const UserRoutes = router
