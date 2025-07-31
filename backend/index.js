import express from 'express'
import dotenv from 'dotenv'
import connectDb from './config/db.js'
import cookieParser from 'cookie-parser'
import authRoutes from './routes/authRoutes.js'
dotenv.config()
import cors from "cors"
import userRoutes from './routes/userRoutes.js'
import productRoutes from './routes/productRoutes.js'
import cart from './routes/cartRoutes.js'
import orderRoutes from './routes/orderRoutes.js'

let port = process.env.PORT || 6000 // Use 8000 to match your frontend

let app = express()

app.use(express.json())
app.use(cookieParser())
app.use(cors({
  origin: ["https://smartcart-frontendone.onrender.com", "http://localhost:5174"],
  credentials: true
}))

app.use("/api/auth", authRoutes)
app.use("/api/user", userRoutes)
app.use("/api/product", productRoutes)
app.use("/api/cart", cart)
app.use("/api/order", orderRoutes)

// Connect to DB before starting the server
connectDb()
  .then(() => {
    app.listen(port, () => {
      console.log("Hello From Server")
      console.log("Database connected successfully")
    })
  })
  .catch((err) => {
    console.error("DB connection error:", err)
    process.exit(1)
  })


