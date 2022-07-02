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
app.use(morgan('dev'))
app.use(cookieParser())

//routes
app.use('/api', routes)

//connect to mongodb
import './config/database'

const PORT = process.env.PORT || 5500
app.listen(PORT, () => {
  console.log(`server listening on port ${PORT}`)
})
