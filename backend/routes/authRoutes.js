import express from 'express'
// Fix import path for authController.js
import { registration, login, logout, googleLogin, adminLogin } from '../controller/authController.js'

const authRoutes = express.Router()

authRoutes.post('/registration',registration)
authRoutes.post('/login',login)
authRoutes.get('/logout',logout)
authRoutes.post('/googlelogin',googleLogin)
authRoutes.post('/adminlogin',adminLogin)

export default authRoutes

