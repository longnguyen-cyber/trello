import mongoose from 'mongoose'
import { ICard } from '../config/interface'

const cardSchema = new mongoose.Schema(
  {
    board: mongoose.Types.ObjectId,
    column: mongoose.Types.ObjectId,
    title: {
      type: String,
      require: [true, 'Please add your title card'],
      trim: true,
      minLength: 10,
      maxLength: 20
    },
    desctiption: {
      type: String,
      trim: true,
      minLength: 10,
      maxLength: 100
    },
    thumbnail: {
      type: String,
      require: true
    }
  },
  {
    timestamps: true
  }
)
export default mongoose.model<ICard>('card', cardSchema)
