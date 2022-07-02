import mongoose, { ConnectOptions } from 'mongoose'

const URL = process.env.MONGO_URL

mongoose.connect(
  `${URL}`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  } as ConnectOptions,
  (err) => {
    if (err) {
      console.log(err)
    } else {
      console.log('Connected to MongoDB')
    }
  }
)
