import cookieParser from 'cookie-parser'
import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
import morgan from 'morgan'
dotenv.config()

import routes from './routes'

//middleware
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')
  res.header('Access-Control-Allow-Headers', 'Content-Type')
  next()
})
app.use(morgan('dev'))
app.use(cookieParser())

//routes
app.use('/api', routes)

//connect to mongodb
import './config/database'

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`server listening on port ${PORT}`)
})
