import mongoose from 'mongoose'
import { ICard } from '../config/interface'

const cardSchema = new mongoose.Schema(
  {
    board: mongoose.Types.ObjectId,
    column: mongoose.Types.ObjectId,
    content: {
      type: String,
      require: [true, 'Please add your content card'],
      trim: true,
      minLength: 10,
      maxLength: 20
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
