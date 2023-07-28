import express from 'express'
import { UserController } from './user.controller'
const router = express.Router()

// Register a new user
router.post('/sign-up', UserController.signUp)

// Login a user
router.post('/login', UserController.login)

export const UserRoutes = router
